import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-perfil-tutor',
  templateUrl: './editar-perfil-tutor.component.html',
  styleUrls: ['./editar-perfil-tutor.component.scss']
})
export class EditarPerfilTutorComponent implements OnInit {
  tutorForm!: FormGroup;
  sucesso = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tutorForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.carregarDadosTutor();
  }

  carregarDadosTutor(): void {
    this.perfilService.getPerfilTutor().subscribe({
      next: (tutor) => {
        this.tutorForm.patchValue(tutor);
      },
      error: () => {
        this.erro = 'Erro ao carregar dados do perfil.';
      }
    });
  }

  salvar(): void {
    if (this.tutorForm.invalid) return;

    this.perfilService.atualizarPerfilTutor(this.tutorForm.value).subscribe({
      next: () => {
        this.sucesso = true;
        this.erro = '';
      },
      error: () => {
        this.sucesso = false;
        this.erro = 'Erro ao salvar alterações.';
      }
    });
  }
}
