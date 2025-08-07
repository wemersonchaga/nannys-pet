import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Pet {
  id: number;
  nome: string;
  especie: string;
  raca?: string;
  porte: string;
  idade: number;
  genero: string;
  castrado: boolean;
  observacoes?: string;
  foto?: string;
}

@Component({
  selector: 'app-detalhes-pet',
  templateUrl: './detalhes-pet.component.html',
  styleUrls: ['./detalhes-pet.component.css']
})
export class DetalhesPetComponent implements OnInit {
  petId!: number | null;
  pet: Pet | null = null;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.petId = idParam ? Number(idParam) : null;

    if (!this.petId || isNaN(this.petId)) {
      this.error = 'ID do pet inválido.';
      this.loading = false;
      return;
    }

    this.http.get<Pet>(`${environment.apiUrl}/pets/${this.petId}/`).subscribe({
      next: (data) => {
        this.pet = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar dados do pet.';
        this.loading = false;
      }
    });
  }
}
