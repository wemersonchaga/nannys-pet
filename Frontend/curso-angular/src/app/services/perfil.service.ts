// 1. No perfil.service.ts:

// a) Declare apiUrl corretamente (geralmente importando do environment)
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export class PerfilService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `JWT ${token}` : '',
    });
  }

  // 2. Garanta que só exista uma única declaração de cada método:
  getPerfilCuidador(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/cuidadores/me/`, { headers });
  }

  atualizarPerfilCuidador(dados: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/cuidadores/me/`, dados, { headers });
  }

  getPerfilTutor(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/tutor/me/`, { headers });
  }

  atualizarPerfilTutor(dados: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch(`${this.apiUrl}/tutor/me/`, dados, { headers });
  }
}
