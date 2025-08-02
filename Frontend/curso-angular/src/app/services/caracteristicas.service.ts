import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Caracteristicas } from '../Caracteristicas';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getCaracteristicas(): Observable<Caracteristicas[]> {
    return this.http.get<Caracteristicas[]>(`${environment.apiUrl}/caracteristicas/`);
  }
}
