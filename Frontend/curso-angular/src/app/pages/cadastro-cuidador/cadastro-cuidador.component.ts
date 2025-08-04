import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { CuidadorService } from '../../services/cuidador.service';
@Component({
  selector: 'app-cadastro-cuidador',
  templateUrl: './cadastro-cuidador.component.html',
  styleUrls: ['./cadastro-cuidador.component.css']
})

export class CadastroCuidadorComponent implements OnInit {
  cuidadorForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  caracteristicasDisponiveis: any[] = []; // Popule no ngOnInit()
  portesDisponiveis: any[] = []; // Popule no ngOnInit()
  usuario: any = null;

  constructor(
    private fb: FormBuilder,
    private cuidadorService: CuidadorService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cuidadorForm = this.fb.group({
      nome: [{ value: '', disabled: true }, Validators.required],
      sobrenome: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      data_nascimento: [''],
      descricao: [''],
      telefone: ['', [Validators.required]],
      cep: [''],
      estado: [''],
      cidade: [''],
      rua: ['', [Validators.required]],
      numero: [''],
      instagram: [''],
      preco_diaria: [''],
      caracteristicas: this.fb.array([]),
      portes_aceitos: this.fb.array([]),
    });
    this.buscarUsuarioLogado();
    this.carregarCaracteristicas();
    this.carregarPortesAceitos();
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
    this.cuidadorService.getCaracteristicas().subscribe((data: any[]) => {
      this.caracteristicasDisponiveis = data;
      const formArray = this.cuidadorForm.get('caracteristicas') as FormArray;
      data.forEach(() => formArray.push(this.fb.control(false)));
    });
  }

  carregarPortesAceitos(): void {
    this.cuidadorService.getPortes().subscribe((data: any[]) => {
      this.portesDisponiveis = data; // ex: ['Pequeno', 'Medio', 'Grande']
      const formArray = this.cuidadorForm.get('portes_aceitos') as FormArray;
      formArray.clear(); // garante que não há duplicação
      data.forEach(() => formArray.push(this.fb.control(false)));
    });
  }

  buscarEnderecoPorCep(): void {
    const cep = this.cuidadorForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.cuidadorService.buscarEnderecoPorCep(cep).subscribe((endereco) => {
        this.cuidadorForm.patchValue({
          rua: endereco.logradouro,
          cidade: endereco.localidade,
          estado: endereco.uf,
        });
      });
    }
  }

  formatarPreco(): void {
    let valor = this.cuidadorForm.get('preco_diaria')?.value;
    if (valor) {
      // Substitui vírgula por ponto
      valor = valor.toString().replace(',', '.');
      // Remove qualquer caractere que não seja número ou ponto
      valor = valor.replace(/[^0-9.]/g, '');
      // Converte para número com 2 casas decimais
      const numero = parseFloat(valor);
      if (!isNaN(numero)) {
        const formatado = numero.toFixed(2);
        this.cuidadorForm.get('preco_diaria')?.setValue(formatado);
      } else {
        this.cuidadorForm.get('preco_diaria')?.setValue('');
      }
    }
  }

  onSubmit(): void {
    if (this.cuidadorForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const selectedCaracteristicas = this.cuidadorForm.value.caracteristicas
      .map((v: boolean, i: number) => (v ? this.caracteristicasDisponiveis[i].id : null))
      .filter((v: number | null) => v !== null);

    const selectedPortes = this.cuidadorForm.value.portes_aceitos
      .map((v: boolean, i: number) => (v ? this.portesDisponiveis[i].id : null))
      .filter((v: number | null) => v !== null);

    const cuidadorData = {
      ...this.cuidadorForm.value,
      caracteristicas_ids: selectedCaracteristicas,
      portes_aceitos: selectedPortes,
    };
    // Converte preco_diaria para número (float), se fornecido
    if (cuidadorData.preco_diaria !== null && cuidadorData.preco_diaria !== '') {
      cuidadorData.preco_diaria = parseFloat(cuidadorData.preco_diaria);
    } else {
      cuidadorData.preco_diaria = null;
    }

    delete cuidadorData.caracteristicas;
    delete cuidadorData.portes_aceitos;

    this.cuidadorService.criarCuidador(cuidadorData).subscribe({
      next: () => this.router.navigate(['/inicio']),
      error: (err) => {
        this.errorMessage = 'Erro ao cadastrar cuidador. Tente novamente.';
        this.isSubmitting = false;
        console.error(err);
      }
    });
  }
}
