import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // IMPORTAR HttpClient
import { CuidadorService } from '../../services/cuidador.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-cuidador',
  templateUrl: './cadastro-cuidador.component.html',
  styleUrls: ['./cadastro-cuidador.component.css']
})
export class CadastroCuidadorComponent implements OnInit {
  cuidadorForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  imagePreview: string | ArrayBuffer | null = null;
  
  caracteristicasDisponiveis: { id: number, nome: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private cuidadorService: CuidadorService,
    private router: Router,
    private http: HttpClient  // INJETAR HttpClient aqui
  ) {
    this.cuidadorForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      cep: [''],
      numero: [''],
      instagram: [''],

      // Se quiser preencher esses campos com dados do CEP, precisa adicioná-los aqui:
      endereco: [''],  // ex: logradouro
      cidade: [''],
      estado: [''],

      foto_perfil: [null],
      caracteristicas: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.fetchCaracteristicas();
  }
  
  get caracteristicasFormArray() {
    return this.cuidadorForm.get('caracteristicas') as FormArray;
  }

  private fetchCaracteristicas(): void {
    fetch(`${environment.apiUrl}/caracteristicas/`)
      .then(res => res.json())
      .then(data => {
        this.caracteristicasDisponiveis = data;
        data.forEach(() => this.caracteristicasFormArray.push(new FormControl(false)));
      })
      .catch(err => console.error('Erro ao buscar características', err));
  }
  
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.cuidadorForm.patchValue({ foto_perfil: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.cuidadorForm.invalid) {
      this.cuidadorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.cuidadorForm.getRawValue();

    const selectedCaracteristicasIds = formValue.caracteristicas
      .map((checked: boolean, i: number) => checked ? this.caracteristicasDisponiveis[i].id : null)
      .filter((id: number | null) => id !== null) as number[];

    const formData = new FormData();
    formData.append('nome', formValue.nome);
    formData.append('sobrenome', formValue.sobrenome);
    formData.append('cpf', formValue.cpf);
    formData.append('email', formValue.email);
    formData.append('telefone', formValue.telefone);
    formData.append('data_nascimento', formValue.data_nascimento);
    formData.append('cep', formValue.cep);
    formData.append('numero', formValue.numero);
    formData.append('instagram', formValue.instagram);
    formData.append('endereco', formValue.endereco || '');
    formData.append('cidade', formValue.cidade || '');
    formData.append('estado', formValue.estado || '');

    selectedCaracteristicasIds.forEach(id => formData.append('caracteristicas_ids', id.toString()));

    if (formValue.foto_perfil) {
      formData.append('foto_perfil', formValue.foto_perfil);
    }

    this.cuidadorService.createCuidador(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao criar perfil. Tente novamente.';
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }

  buscarEnderecoPorCep(): void {
    const cep = this.cuidadorForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        data => {
          this.cuidadorForm.patchValue({
            endereco: data.logradouro,
            cidade: data.localidade,
            estado: data.uf
          });
        },
        error => {
          console.error('Erro ao buscar endereço pelo CEP', error);
        }
      );
    }
  }
}
