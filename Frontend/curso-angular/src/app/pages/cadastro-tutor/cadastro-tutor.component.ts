import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-tutor',
  templateUrl: './cadastro-tutor.component.html',
  styleUrls: ['./cadastro-tutor.component.css']
})
export class CadastroTutorComponent implements OnInit {
  tutorForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  usuario: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tutorForm = this.fb.group({
      nome: [{ value: '', disabled: true }, Validators.required],
      sobrenome: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      data_nascimento: ['']
    });

    this.buscarUsuarioLogado();
  }

  buscarUsuarioLogado(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Token ${token}` });
      this.http.get(`${environment.apiUrl}/usuarios/me/`, { headers }).subscribe({
        next: (res: any) => {
          this.usuario = res;
          this.tutorForm.patchValue({
            nome: res.nome,
            email: res.email
          });
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
        }
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.tutorForm.valid) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('nome', this.usuario?.nome || '');
    formData.append('sobrenome', this.tutorForm.get('sobrenome')?.value);
    formData.append('cpf', this.tutorForm.get('cpf')?.value);
    formData.append('email', this.usuario?.email || '');

    const dataNascimento = this.tutorForm.get('data_nascimento')?.value;
    if (dataNascimento) {
      formData.append('data_nascimento', dataNascimento);
    }

    const token = localStorage.getItem('token');
    const options = token
      ? { headers: new HttpHeaders({ Authorization: `Token ${token}` }) }
      : undefined;

    this.http.post(`${environment.apiUrl}/tutores/`, formData, options).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso!';
        this.isSubmitting = false;

        setTimeout(() => {
          this.router.navigate(['/perfil']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao cadastrar tutor:', err);
        this.errorMessage = 'Erro ao cadastrar tutor. Verifique os dados e tente novamente.';
        this.isSubmitting = false;
      }
    });
  }
}
