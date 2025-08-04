import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cuidador } from '../Cuidador';
import { Caracteristicas } from '../Caracteristicas';
import { environment } from '../../environments/environment';
import { Porte } from '../Cuidador'; // ou ajuste o caminho conforme onde está definido o type


@Injectable({
  providedIn: 'root'
})

export class CuidadorService {

  private baseUrl = `${environment.apiUrl}/cuidadores/`;

  constructor(private http: HttpClient) { }

  // Cria um cuidador usando FormData
  criarCuidador(formData: FormData): Observable<Cuidador> {
    return this.http.post<Cuidador>(this.baseUrl, formData);
  }

  // Atualiza um cuidador específico pelo ID usando FormData
  updateCuidador(id: number, formData: FormData): Observable<Cuidador> {
    return this.http.put<Cuidador>(`${this.baseUrl}${id}/`, formData);
  }

  // Retorna lista de todos cuidadores
  getCuidadores(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(this.baseUrl);
  }

  // Retorna características de um cuidador
  getCaracteristicasDoCuidador(cuidadorId: number): Observable<Caracteristicas[]> {
    return this.http.get<Caracteristicas[]>(`${this.baseUrl}${cuidadorId}/caracteristicas/`);
  }

  // Filtra cuidadores por características, CEP e disponibilidade
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
  // Buscar endereço pelo CEP
  buscarEnderecoPorCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }
  // Buscar todos os portes disponíveis
  getPortes(): Observable<Porte[]> {
    const url = `${environment.apiUrl}/portes/`;
    return this.http.get<Porte[]>(url);
  }
   // Buscar todas as características disponíveis
  getCaracteristicas(): Observable<Caracteristicas[]> {
    return this.http.get<Caracteristicas[]>(`${environment.apiUrl}/caracteristicas/`);
  }
}
