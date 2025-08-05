import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from '../../services/perfil.service';
import { CuidadorService } from '../../services/cuidador.service';
import { Caracteristicas } from '../../Caracteristicas';
import { CaracteristicasService } from '../../services/caracteristicas.service';
import { Porte } from '../../Porte';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userData: any;
  perfilTipo: 'tutor' | 'cuidador' | 'nenhum' = 'nenhum';
  pets: any[] = [];
  caracteristicasDisponiveis: Caracteristicas[] = [];
  portesDisponiveis: Porte[] = [];


  constructor(
    private perfilService: PerfilService,
    private caracteristicasService: CaracteristicasService,
    private cuidadorService:CuidadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCaracteristicas();
    this.loadPortesDisponiveis();
  }

  private loadCaracteristicas(): void {
    this.caracteristicasService.getCaracteristicas().subscribe({
      next: (data) => {
        this.caracteristicasDisponiveis = data;
      },
      error: (err) => {
        console.error('Erro ao carregar características disponíveis:', err);
      }
    });
  }

  private loadPortesDisponiveis(): void {
  this.cuidadorService.getPortes().subscribe({
    next: (data) => {
      this.portesDisponiveis = data;
    },
    error: (err) => {
      console.error('Erro ao carregar portes:', err);
    }
  });
}

  get caracteristicasCuidadorFormatadas(): string {
    if (!this.userData?.caracteristicas || !this.caracteristicasDisponiveis?.length) {
      return '';
    }
    return this.userData.caracteristicas
    .map((id: number) => this.getNomeCaracteristicaPorId(id))
    .join(', ');
  }


  get portesAceitosFormatados(): string {
    if (!this.userData?.portes_aceitos || !Array.isArray(this.userData.portes_aceitos)) return '';
    return this.userData.portes_aceitos
    .map((id: number) => this.getNomePortePorId(id))
    .join(', ');
  }


  getNomeCaracteristicaPorId(id: number): string {
    const caract = this.caracteristicasDisponiveis.find(c => c.id === id);
    return caract ? caract.nome : 'Desconhecido';
  }

  getNomePortePorId(id: number): string {
    const porte = this.portesDisponiveis.find(p => p.id === id);
    return porte ? porte.nome : 'Desconhecido';
  }


  loadUserData(): void {
    this.perfilService.getPerfilTutor().subscribe({
      next: (tutorData) => {
        if (tutorData && tutorData.id) {
          this.userData = tutorData;
          this.perfilTipo = 'tutor';
          this.loadPets();
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