import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil-cuidador',
  templateUrl: './editar-perfil-cuidador.component.html',
  styleUrls: ['./editar-perfil-cuidador.component.css']
})
export class EditarPerfilCuidadorComponent implements OnInit {
  cuidadorForm!: FormGroup;
  isSubmitting: boolean = false;
  erroCarregamento: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarDadosCuidador();
  }

  private inicializarFormulario(): void {
    this.cuidadorForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      data_nascimento: [''],
      instagram: ['']
    });
  }

  private carregarDadosCuidador(): void {
    this.perfilService.getPerfilCuidador().subscribe({
      next: (data) => {
        if (data) {
          this.cuidadorForm.patchValue({
            nome: data.nome || '',
            sobrenome: data.sobrenome || '',
            data_nascimento: data.data_nascimento || '',
            instagram: data.instagram || ''
          });
        } else {
          this.erroCarregamento = true;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados do cuidador', err);
        this.erroCarregamento = true;
      }
    });
  }

  salvarAlteracoes(): void {
    if (this.cuidadorForm.invalid) {
      this.cuidadorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.perfilService.atualizarPerfilCuidador(this.cuidadorForm.value).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso!');
        this.router.navigate(['/perfil-cuidador']);
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil', err);
        alert('Erro ao atualizar perfil. Verifique os dados ou tente novamente mais tarde.');
        this.isSubmitting = false;
      }
    });
  }
}