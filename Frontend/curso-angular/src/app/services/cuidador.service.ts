import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cuidador } from '../Cuidador';
import { Caracteristicas } from '../Caracteristicas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuidadorService {

  private baseUrl = `${environment.apiUrl}/cuidadores/`;

  constructor(private http: HttpClient) { }

  // Criação de cuidador (com FormData)
  createCuidador(formData: FormData): Observable<Cuidador> {
    return this.http.post<Cuidador>(this.baseUrl, formData);
  }

  // Listar todos os cuidadores (autenticado via interceptor)
  getCuidadores(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(this.baseUrl);
  }

  // Buscar as características de um cuidador específico
  getCaracteristicasDoCuidador(cuidadorId: number): Observable<Caracteristicas[]> {
    const url = `${this.baseUrl}${cuidadorId}/caracteristicas/`;
    return this.http.get<Caracteristicas[]>(url);
  }

  // Filtrar cuidadores por características, cep e disponível
  getCuidadoresFiltrados(filtros: { caracteristicas?: number[], cep?: string, disponivel?: boolean }): Observable<Cuidador[]> {
    let params = new HttpParams();

    if (filtros.caracteristicas && filtros.caracteristicas.length > 0) {
      filtros.caracteristicas.forEach(id => {
        params = params.append('caracteristicas', id.toString());
      });
    }

    if (filtros.cep) {
      params = params.set('cep', filtros.cep);
    }

    if (filtros.disponivel !== undefined) {
      params = params.set('disponivel', filtros.disponivel.toString());
    }

    return this.http.get<Cuidador[]>(`${this.baseUrl}filtrar/`, { params });
  }
}
