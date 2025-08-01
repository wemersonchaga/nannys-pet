import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userData: any;
  perfilTipo: 'tutor' | 'cuidador' | 'nenhum' = 'nenhum';
  pets: any[] = [];

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // Tenta carregar perfil de tutor
    this.perfilService.getPerfilTutor().subscribe({
      next: (tutorData) => {
        if (tutorData && Object.keys(tutorData).length > 0) {
          this.userData = tutorData;
          this.perfilTipo = 'tutor';
          this.loadPets(); // carrega os pets do tutor
        } else {
          this.loadCuidadorFallback();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar perfil de tutor:', err);
        this.loadCuidadorFallback();
      }
    });
  }

  private loadCuidadorFallback(): void {
    this.perfilService.getPerfilCuidador().subscribe({
      next: (cuidadorData) => {
        if (cuidadorData && Object.keys(cuidadorData).length > 0) {
          this.userData = cuidadorData;
          this.perfilTipo = 'cuidador';
        } else {
          this.perfilTipo = 'nenhum';
          this.router.navigate(['/escolher-perfil']);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar perfil de cuidador:', err);
        this.perfilTipo = 'nenhum';
        this.router.navigate(['/escolher-perfil']);
      }
    });
  }

  private loadPets(): void {
    this.perfilService.getPetsTutor().subscribe({
      next: (petsData) => {
        this.pets = petsData;
      },
      error: (err) => {
        console.error('Erro ao carregar pets do tutor:', err);
      }
    });
  }
}