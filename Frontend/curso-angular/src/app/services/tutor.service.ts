import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../Tutor';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  private url = 'https://nannys-backend.onrender.com/api/';

  constructor(private http: HttpClient) { }

  createTutor(tutor: Tutor): Observable<Tutor> {
    console.log('Tutor a ser enviado:', tutor);

    const formData: FormData = new FormData();
    Object.entries(tutor).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return this.http.post<Tutor>(this.url + 'tutores/', formData);
  }

  getTutors(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.url + 'tutores/');
  }

}