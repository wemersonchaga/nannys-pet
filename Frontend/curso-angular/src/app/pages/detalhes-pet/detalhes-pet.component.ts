import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-detalhes-pet',
  templateUrl: './detalhes-pet.component.html',
  styleUrls: ['./detalhes-pet.component.css']
})
export class DetalhesPetComponent implements OnInit {
  petId!: number;
  pet: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.petId = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`${environment.apiUrl}/pets/${this.petId}/`).subscribe({
      next: data => this.pet = data,
      error: err => console.error(err)
    });
  }
}
