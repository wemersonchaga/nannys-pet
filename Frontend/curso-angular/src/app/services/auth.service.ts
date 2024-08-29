import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../auth-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiRoot = 'http://localhost:8000/auth/';
  constructor(private http: HttpClient) { }

  private setSession(authResult: {token: string; expiresIn: number }) {
    const token = authResult.token;
    const payload = <JWTPayload> jwtDecode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('Token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log('Token:', token); // Log the token to check its value
    try {
      if (typeof token !== 'string') {
          throw new Error('Token must be a string');
      }
      const payload = jwtDecode(token);
      // Proceed with setting session
      } catch (error) {
      console.error('Error decoding token:', error);
      // Handle the error (e.g., redirect to login, show a message)
      }
    }

  public getToken() {
    return localStorage.getItem('Token');
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      this.apiRoot.concat('login/'),
      { username, password }
    ).pipe(
      tap((response: AuthResponse) => this.setSession(response)),
      shareReplay(),
    );
  }
  signup(username: string, email: string, password1: string, password2: string) {
    return this.http.post<AuthResponse>(
      this.apiRoot.concat('signup/'),
      { username, email, password1, password2 }
    ).pipe(
      tap((response: AuthResponse) => this.setSession(response)),
      shareReplay(),
    );
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('expires_at');
  }

  refreshToken(): Observable<any> {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.getToken() }
      ).pipe(
        tap(response => this.setSession(response as AuthResponse)),
                shareReplay(),
      );
    }
    return new Observable(); // Return an empty observable if the token is not refreshed
  }
  getExpiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return moment(0); // Return a moment object representing the epoch if no expiration is found
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}



//export class AuthService {
 // private apiUrl = 'http://localhost:8000/auth/'; // Altere para a URL do seu backend
 // private token: string | null = null;
//  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//  constructor(private http: HttpClient, private router: Router) {
  //  this.token = localStorage.getItem('token');
 //   this.isLoggedInSubject.next(this.isAuthenticated());
 // }

 // login(username: string, password: string): Observable<any> {
 //   return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
   //   tap(response => {
  //      this.token = response.token;
//        localStorage.setItem('token', this.token);
//        this.isLoggedInSubject.next(true);
//      })
//    );
//  }

//  logout(): void {
//    this.token = null;
//    localStorage.removeItem('token');
//    this.isLoggedInSubject.next(false);
//    this.router.navigate(['/login']); // Redireciona para a página de login
//  }

//  isAuthenticated(): boolean {
//    return this.token !== null;
//  }

//  getToken(): string | null {
//    return this.token;
//  }

//  get isLoggedIn(): Observable<boolean> {
//    return this.isLoggedInSubject.asObservable();
//  }
//}