import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detalhes-cuidador',
  templateUrl: './detalhes-cuidador.component.html',
  styleUrls: ['./detalhes-cuidador.component.css']
})
export class DetalhesCuidadorComponent implements OnInit {
  cuidadorId!: number;
  cuidador: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.cuidadorId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`${environment.apiUrl}/cuidadores/${this.cuidadorId}/`).subscribe({
      next: data => this.cuidador = data,
      error: err => console.error('Erro ao carregar cuidador:', err)
    });
  }
}
