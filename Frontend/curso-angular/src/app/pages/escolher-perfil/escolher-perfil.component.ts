import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escolher-perfil',
  templateUrl: './escolher-perfil.component.html',
  styleUrls: ['./escolher-perfil.component.css']
})
export class EscolherPerfilComponent {
  constructor(private router: Router) {}

  cadastrarTutor() {
    this.router.navigate(['/cadastro-tutor']);
  }

  cadastrarCuidador() {
    this.router.navigate(['/cadastro-cuidador']);
  }
}