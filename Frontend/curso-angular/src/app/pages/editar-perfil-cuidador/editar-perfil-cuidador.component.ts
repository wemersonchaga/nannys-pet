import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil-cuidador',
  templateUrl: './editar-perfil-cuidador.component.html',
  styleUrls: ['./editar-perfil-cuidador.component.css']
})
export class EditarPerfilCuidadorComponent implements OnInit {
  cuidador: any = {
    telefone: '',
    endereco: '',
    descricao: '',
    servicos: ''
  };

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.perfilService.getPerfilCuidador().subscribe({
      next: (data) => {
        this.cuidador = data;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do cuidador', err);
      }
    });
  }

  salvarAlteracoes(): void {
    this.perfilService.atualizarPerfilCuidador(this.cuidador).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso!');
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil', err);
        alert('Erro ao atualizar perfil. Tente novamente.');
      }
    });
  }
}