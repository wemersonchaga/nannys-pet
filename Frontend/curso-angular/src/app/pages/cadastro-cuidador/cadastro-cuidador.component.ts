import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-cuidador',
  templateUrl: './cadastro-cuidador.component.html',
  styleUrls: ['./cadastro-cuidador.component.css']
})
export class CadastroCuidadorComponent implements OnInit {
  cuidadorForm!: FormGroup;
  caracteristicasDisponiveis: any[] = [];
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  usuario: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cuidadorForm = this.fb.group({
      nome: [{ value: '', disabled: true }, Validators.required], // só visual
      email: [{value: '', disabled: true}], // só visual
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      data_nascimento: [''],
      telefone: ['', Validators.required],
      cep: [''],
      estado: [''],
      cidade: [''],
      rua: ['', Validators.required],
      numero: [''],
      instagram: [''],
      caracteristicas: this.fb.array([], Validators.required)
    });


    this.buscarUsuarioLogado();
    this.carregarCaracteristicas();
  }

 buscarUsuarioLogado(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Token ${token}` });
      this.http.get(`${environment.apiUrl}/usuarios/me/`, { headers }).subscribe({
        next: (res: any) => {
          this.usuario = res;
          this.cuidadorForm.patchValue({
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

  carregarCaracteristicas(): void {
    this.http.get<any[]>(`${environment.apiUrl}/caracteristicas/`).subscribe(data => {
      this.caracteristicasDisponiveis = data;
      const formArray = this.cuidadorForm.get('caracteristicas') as FormArray;
      formArray.clear();
      data.forEach(() => formArray.push(this.fb.control(false)));
    });
  }

  buscarEnderecoPorCep(): void {
    const cepControl = this.cuidadorForm.get('cep');
    if (!cepControl) return;

    const cep = cepControl.value?.replace(/\D/g, '') || '';

    if (cep.length !== 8) {
      alert('CEP inválido.');
      return;
    }

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (data) => {
        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }

        this.cuidadorForm.patchValue({
          rua: data.logradouro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        });
      },
      error: () => {
        alert('Erro ao buscar endereço. Verifique sua conexão.');
      }
    });
  }


  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.cuidadorForm.valid) {
      this.errorMessage = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    // Campos do formulário
    formData.append('nome', this.usuario?.nome || '');
    formData.append('sobrenome', this.cuidadorForm.get('sobrenome')?.value);
    formData.append('cpf', this.cuidadorForm.get('cpf')?.value);
    formData.append('email', this.usuario?.email || '');
    formData.append('telefone', this.cuidadorForm.get('telefone')?.value);
    const dataNascimento = this.cuidadorForm.get('data_nascimento')?.value;
    if (dataNascimento) {
      formData.append('data_nascimento', dataNascimento);
    };
    formData.append('cep',this.cuidadorForm.get('cep')?.value);
    formData.append('estado',this.cuidadorForm.get('estado')?.value);
    formData.append('cidade',this.cuidadorForm.get('cidade')?.value);
    formData.append('rua',this.cuidadorForm.get('rua')?.value);
    formData.append('numero',this.cuidadorForm.get('numero')?.value);
    formData.append('instagram',this.cuidadorForm.get('instagram')?.value);

    // Características
    const caracteristicasSelecionadas: number[] = this.cuidadorForm.value.caracteristicas
      .map((checked: boolean, i: number) => checked ? this.caracteristicasDisponiveis[i].id : null)
      .filter((id: number | null) => id !== null) as number[];

    caracteristicasSelecionadas.forEach(id => {
      formData.append('caracteristicas_ids', id.toString());
    });

    const token = localStorage.getItem('token');
    const options = token
      ? { headers: new HttpHeaders({ Authorization: `Token ${token}` }) }
      : undefined;

    // Envio para API
    this.http.post(`${environment.apiUrl}/cuidadores/`, formData, options).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso!';
        this.isSubmitting = false;
        setTimeout(() => {
          this.router.navigate(['/perfil']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao cadastrar cuidador:', err);
        this.errorMessage = 'Erro ao cadastrar cuidador. Verifique os dados e tente novamente.';
        this.isSubmitting = false;
      }
    });
  }
  get caracteristicasControls() {
    return (this.cuidadorForm.get('caracteristicas') as FormArray).controls;
  }
}