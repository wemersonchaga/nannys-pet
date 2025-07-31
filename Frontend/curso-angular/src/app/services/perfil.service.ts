import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private tutorUrl = `${environment.apiUrl}/tutores/`;
  private cuidadorUrl = `${environment.apiUrl}/cuidadores/`;

  constructor(private http: HttpClient) {}

  /**
   * Gera os headers com o token JWT armazenado no localStorage.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Token ${token}` : '',
      'Accept': 'application/json'
    });
  }

  // =====================
  // ===== TUTOR =========
  // =====================

  /**
   * Cadastra um novo perfil de tutor com dados em FormData (inclui imagem).
   */
  cadastrarTutor(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.tutorUrl, formData, { headers });
  }

  /**
   * Retorna os dados do tutor logado.
   */
  getPerfilTutor(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.tutorUrl}me/`, { headers });
  }

  /**
   * Atualiza os dados do tutor logado.
   */
  atualizarPerfilTutor(dados: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.tutorUrl}me/`, dados, { headers });
  }

  // =====================
  // ===== CUIDADOR ======
  // =====================

  /**
   * Retorna os dados do cuidador logado.
   */
  getPerfilCuidador(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.cuidadorUrl}me/`, { headers });
  }

  /**
   * Atualiza os dados do cuidador logado.
   */
  atualizarPerfilCuidador(dados: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.cuidadorUrl}me/`, dados, { headers });
  }
}
