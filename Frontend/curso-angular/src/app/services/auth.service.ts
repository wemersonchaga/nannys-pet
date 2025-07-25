import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../auth-response.model';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api`;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedIn.next(!!localStorage.getItem('token'));
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { username, password }).pipe(
      tap((response: any) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      this.loggedIn.next(false);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setSession(authResult: { token: string; expiresIn: number }) {
    const token = authResult.token;
    try {
      const payload = jwtDecode<JWTPayload>(token);
      const expiresAt = dayjs.unix(payload.exp);

      localStorage.setItem('token', token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      this.loggedIn.next(true);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
    }
  }

  signup(username: string, email: string, password1: string, password2: string) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/register/`,
      { username, email, password1, password2 }
    ).pipe(
      tap((response: AuthResponse) => this.setSession(response)),
      shareReplay(),
    );
  }

  refreshToken(): Observable<any> {
    const now = dayjs();
    const expiration = this.getExpiration();

    if (now.isAfter(expiration.subtract(1, 'day')) && now.isBefore(expiration)) {
      return this.http.post(
        `${this.baseUrl}/refresh-token/`,
        { token: this.getToken() }
      ).pipe(
        tap(response => this.setSession(response as AuthResponse)),
        shareReplay(),
      );
    }
    return of(null);
  }

  getExpiration(): dayjs.Dayjs {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      return dayjs(parseInt(expiration, 10));
    }
    return dayjs(0);
  }

  isLoggedOut(): Observable<boolean> {
    return this.isLoggedIn().pipe(tap(loggedIn => !loggedIn));
  }
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('access');
    if (!token) {
      return throwError(() => new Error('Token não encontrado.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/usuarios/me/`, { headers });
  }

}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT ' + token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    let loggedIn = false;
    this.authService.isLoggedIn().subscribe(isLogged => loggedIn = isLogged);
    if (loggedIn) {
      this.authService.refreshToken();
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
}