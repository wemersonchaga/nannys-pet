import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { CaracteristicasService } from '../../services/caracteristicas.service';
import { CuidadorService } from '../../services/cuidador.service';
import { Caracteristicas } from '../../Caracteristicas';
import { Cuidador } from '../../Cuidador';
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

  constructor(
    private fb: FormBuilder,
    private cuidadorService: CuidadorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cuidadorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

    this.carregarCaracteristicas();
    this.carregarPortesAceitos();
  }

  carregarCaracteristicas(): void {
    this.cuidadorService.getCaracteristicas().subscribe((data: any[]) => {
      this.caracteristicasDisponiveis = data;
      const formArray = this.cuidadorForm.get('caracteristicas') as FormArray;
      data.forEach(() => formArray.push(this.fb.control(false)));
    });
  }

  carregarPortesAceitos(): void {
  this.cuidadorService.getPortes().subscribe((data: string[]) => {
    this.portesDisponiveis = data; // ex: ['Pequeno', 'medio', 'grande']
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
