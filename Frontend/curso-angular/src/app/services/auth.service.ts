import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, shareReplay, take } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../auth-response.model';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
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
  private baseUrl = environment.apiUrl; // ✅ Corrigido: sem /api duplicado
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

  isAuthenticated(): boolean {
  return !!this.getToken();
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
      console.error('Erro ao decodificar o token:', error);
      this.logout();
    }
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data);
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
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token não encontrado.'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`  // ✅ Correto para Django TokenAuth
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
        headers: req.headers.set('Authorization', 'Token ' + token)
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

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      tap(loggedIn => {
        if (!loggedIn) {
          this.authService.logout();
          this.router.navigate(['login']);
        } else {
          this.authService.refreshToken().subscribe();
        }
      })
    );
  }
}
