import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tutor } from '../Tutor';       // ajuste o caminho conforme seu projeto
import { Cuidador } from '../Cuidador'; // ajuste o caminho conforme seu projeto

// Interface básica para Pet, ajuste campos conforme seu backend
export interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  porte?: string;
  idade?: number;
  foto?: string;
  // outros campos que você usar
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private tutorUrl = `${environment.apiUrl}/tutores/`;
  private cuidadorUrl = `${environment.apiUrl}/cuidadores/`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Token ${token}` : '',
      'Accept': 'application/json'
    });
  }

  // TUTOR
  cadastrarTutor(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.tutorUrl, formData, { headers });
  }

  getPerfilTutor(): Observable<Tutor> {
    const headers = this.getAuthHeaders();
    return this.http.get<Tutor>(`${this.tutorUrl}me/`, { headers });
  }

  atualizarPerfilTutor(dados: any): Observable<Tutor> {
    const headers = this.getAuthHeaders();
    return this.http.patch<Tutor>(`${this.tutorUrl}me/`, dados, { headers });
  }

  getPetsTutor(): Observable<Pet[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pet[]>(`${environment.apiUrl}/pets/`, { headers });
  }

  // CUIDADOR
  getPerfilCuidador(): Observable<Cuidador> {
    const headers = this.getAuthHeaders();
    return this.http.get<Cuidador>(`${this.cuidadorUrl}me/`, { headers });
  }

  atualizarPerfilCuidador(dados: any): Observable<Cuidador> {
    const headers = this.getAuthHeaders();
    return this.http.patch<Cuidador>(`${this.cuidadorUrl}me/`, dados, { headers });
  }
}