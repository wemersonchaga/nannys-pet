import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PerfilService } from '../../services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalAberto = false;
  usuarioLogado = false;
  tipoPerfil: 'tutor' | 'cuidador' | null = null;

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificarUsuario();
  }

  verificarUsuario(): void {
  this.usuarioLogado = this.authService.isAuthenticated();

  if (!this.usuarioLogado) return;

  this.perfilService.getPerfilTutor().subscribe({
    next: () => {
      this.tipoPerfil = 'tutor';
      localStorage.setItem('perfil', 'tutor');
    },
    error: () => {
      this.perfilService.getPerfilCuidador().subscribe({
        next: () => {
          this.tipoPerfil = 'cuidador';
          localStorage.setItem('perfil', 'cuidador');
        },
        error: () => {
          this.tipoPerfil = null;
          localStorage.removeItem('perfil');
        }
      });
    }
  });
}

  abrirModal(): void {
    if (!this.usuarioLogado) {
      this.modalAberto = true;
    } else {
      // Redireciona conforme o tipo de perfil
      switch (this.tipoPerfil) {
        case 'tutor':
          this.router.navigate(['/tutor/dashboard']);
          break;
        case 'cuidador':
          this.router.navigate(['/cuidador/dashboard']);
          break;
        default:
          this.router.navigate(['/cadastro-perfil']);
          break;
      }
    }
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  navigateToCadastro(tipo: 'tutor' | 'cuidador'): void {
    this.router.navigate([`/cadastro-${tipo}`]);
  }
}
