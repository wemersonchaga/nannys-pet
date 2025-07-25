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

  constructor(private perfilService: PerfilService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.perfilService.getPerfilTutor().subscribe({
      next: (tutorData) => {
        if (tutorData && Object.keys(tutorData).length > 0) {
          this.userData = tutorData;
          this.perfilTipo = 'tutor';
        } else {
          // Se não for tutor, tenta carregar cuidador
          this.perfilService.getPerfilCuidador().subscribe({
            next: (cuidadorData) => {
              if (cuidadorData && Object.keys(cuidadorData).length > 0) {
                this.userData = cuidadorData;
                this.perfilTipo = 'cuidador';
              } else {
                // Sem perfil tutor nem cuidador, redireciona para escolher perfil
                this.perfilTipo = 'nenhum';
                this.router.navigate(['/escolher-perfil']);
              }
            },
            error: (err) => {
              console.error('Erro ao carregar perfil cuidador', err);
              // Redirecionar mesmo assim para escolher perfil
              this.router.navigate(['/escolher-perfil']);
            }
          });
        }
      },
      error: (err) => {
        console.error('Erro ao carregar perfil tutor', err);
        // Tenta cuidador mesmo em caso de erro
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
          error: () => {
            this.router.navigate(['/escolher-perfil']);
          }
        });
      }
    });
  }
}
