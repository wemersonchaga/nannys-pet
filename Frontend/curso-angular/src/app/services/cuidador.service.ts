import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Cuidador } from '../Cuidador';
import { Caracteristicas } from '../Caracteristicas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuidadorService {

  private baseUrl = `${environment.apiUrl}/cuidadores/`;

  constructor(private http: HttpClient) { }

  createCuidador(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token não encontrado.'));
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.post<any>(this.baseUrl, formData, { headers });
  }

  getCuidadors(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(this.baseUrl);
  }

  getCaracteristicasDoCuidador(cuidadorId: number): Observable<Caracteristicas> {
    const url = `${this.baseUrl}${cuidadorId}/caracteristicas`;
    return this.http.get<Caracteristicas>(url);
  }

  getCuidadoresFiltrados(filtros: any): Observable<Cuidador[]> {
    const url = `${environment.apiUrl}/cuidadores-filtrados/`;
    let params = new HttpParams();
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key)) {
        params = params.set(key, filtros[key]);
      }
    }
    return this.http.get<Cuidador[]>(url, { params });
  }
}
