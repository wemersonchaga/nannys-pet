import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-editar-perfil-tutor',
  templateUrl: './editar-perfil-tutor.component.html',
  styleUrls: ['./editar-perfil-tutor.component.scss']
})
export class EditarPerfilTutorComponent implements OnInit {
  tutorForm!: FormGroup;
  sucesso = false;
  erro = '';
  idade: number | null = null;

  constructor(
    private fb: FormBuilder,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.tutorForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      data_nascimento: ['']
    });

    this.carregarDadosTutor();
  }

  carregarDadosTutor(): void {
    this.perfilService.getPerfilTutor().subscribe({
      next: (tutor) => {
        this.tutorForm.patchValue({
          nome: tutor.nome,
          sobrenome: tutor.sobrenome,
          cpf: tutor.cpf,
          email: tutor.email,
          data_nascimento: tutor.data_nascimento
        });

        if (tutor.data_nascimento) {
          this.idade = this.calcularIdade(tutor.data_nascimento);
        }
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

  calcularIdade(dataNascimento: string | Date): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }
}
