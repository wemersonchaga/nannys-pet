import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { CuidadorService } from '../../services/cuidador.service';
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
  listaCaracteristicas: any[] = [];
  listaPortes: any[] = [];
  caracteristicasSelecionadas: number[] = [];
  portesSelecionados: number[] = [];

  constructor(
    private perfilService: PerfilService,
    private cuidadorService: CuidadorService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarDadosCuidador();
    this.carregarCaracteristicas();
    this.carregarPortes();
  }

  private inicializarFormulario(): void {
    this.cuidadorForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      data_nascimento: [''],
      descricao: [''],
      telefone: ['', Validators.required],
      instagram: [''],
      cep: [''],
      estado: [''],
      cidade: [''],
      rua: [''],
      numero: [''],
      preco_diaria: [''],
      caracteristicas_ids: [[]],
      portes_aceitos: [[]]
    });
  }

  private carregarDadosCuidador(): void {
    this.perfilService.getPerfilCuidador().subscribe({
      next: (data) => {
        if (data) {
          this.cuidadorForm.patchValue({
            nome: data.nome || '',
            sobrenome: data.sobrenome || '',
            cpf: data.cpf || '',
            email: data.email || '',
            data_nascimento: data.data_nascimento || '',
            descricao: data.descricao || '',
            telefone: data.telefone || '',
            instagram: data.instagram || '',
            cep: data.cep || '',
            estado: data.estado || '',
            cidade: data.cidade || '',
            rua: data.rua || '',
            numero: data.numero || '',
            preco_diaria: data.preco_diaria || '',
            caracteristicas_ids: data.caracteristicas?.map((c: any) => c.id) || [],
            portes_aceitos: data.portes_aceitos?.map((p: any) => p.id) || []
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

  private carregarCaracteristicas(): void {
    this.cuidadorService.getCaracteristicas().subscribe({
      next: (res) => this.listaCaracteristicas = res,
      error: (err) => console.error('Erro ao carregar características', err)
    });
  }

  private carregarPortes(): void {
    this.cuidadorService.getPortes().subscribe({
      next: (res) => this.listaPortes = res,
      error: (err) => console.error('Erro ao carregar portes', err)
    });
  }

  onChangeCaracteristicas(event: any) {
    const caracteristicaId = +event.target.value;
    if (event.target.checked) {
      this.caracteristicasSelecionadas.push(caracteristicaId);
    } else {
      const index = this.caracteristicasSelecionadas.indexOf(caracteristicaId);
      if (index > -1) {
        this.caracteristicasSelecionadas.splice(index, 1);
      }
    }
  }
  
  onChangePortes(event: any) {
    const porteId = +event.target.value;
    if (event.target.checked) {
      this.portesSelecionados.push(porteId);
    } else {
      const index = this.portesSelecionados.indexOf(porteId);
      if (index > -1) {
        this.portesSelecionados.splice(index, 1);
      }
    }
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