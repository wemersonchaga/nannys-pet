import { Component, OnInit } from '@angular/core';
import { CuidadorService } from '../../services/cuidador.service';
import { CaracteristicasService } from '../../services/caracteristicas.service';
import { Cuidador } from '../../Cuidador';
import { Caracteristicas } from '../../Caracteristicas';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buscar-cuidador',
  templateUrl: './buscar-cuidador.component.html',
  styleUrls: ['./buscar-cuidador.component.css']
})
export class BuscarCuidadorComponent implements OnInit {

  todosCuidadores: Cuidador[] = [];
  cuidadoresFiltrados: Cuidador[] = [];
  caracteristicasForm!: FormGroup;
  caracteristicasDisponiveis: Caracteristicas[] = [];
  caracteristicasSelecionadas: number[] = [];
  submitClicado: boolean = false;

  constructor(
    private cuidadorService: CuidadorService,
    private caracteristicasService: CaracteristicasService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listarTodosCuidadores();
    this.carregarCaracteristicas();
  }

  listarTodosCuidadores(): void {
    this.cuidadorService.getCuidadores().subscribe({
      next: (cuidadores) => {
        this.todosCuidadores = cuidadores;
        this.cuidadoresFiltrados = cuidadores;
        this.submitClicado = false;
      },
      error: (err) => {
        console.error('Erro ao carregar cuidadores:', err);
      }
    });
  }

  carregarCaracteristicas() {
    this.caracteristicasService.getCaracteristicas().subscribe({
      next: (caracteristicas) => {
        this.caracteristicasDisponiveis = caracteristicas;
        this.caracteristicasForm = this.fb.group({
          cep: [''],
          disponivel: [false],
          caracteristicas: this.fb.array(this.caracteristicasDisponiveis.map(() => false))
        });

        this.caracteristicasForm.get('caracteristicas')?.valueChanges.subscribe((val: boolean[]) => {
          this.caracteristicasSelecionadas = this.caracteristicasDisponiveis
            .filter((_, index) => val[index])
            .map(caract => caract.id);
        });
      },
      error: (err) => console.error('Erro ao carregar características:', err)
    });
  }

  getNomeCaracteristicaPorId(id: number): string {
    const caract = this.caracteristicasDisponiveis.find(c => c.id === id);
    return caract ? caract.nome : 'Desconhecido';
  }

  toggleCaracteristica(id: number) {
    const index = this.caracteristicasSelecionadas.indexOf(id);
    if (index === -1) {
      this.caracteristicasSelecionadas.push(id);
    } else {
      this.caracteristicasSelecionadas.splice(index, 1);
    }
  }

  submit(): void {
    this.submitClicado = true;

    // Obtem valores do formulário
    const cep = this.caracteristicasForm.get('cep')?.value;
    const disponivel = this.caracteristicasForm.get('disponivel')?.value;

    const filtros: any = {};

    if (this.caracteristicasSelecionadas.length > 0) {
      filtros.caracteristicas = this.caracteristicasSelecionadas;
    }

    if (cep && cep.trim() !== '') {
      filtros.cep = cep.trim();
    }

    filtros.disponivel = disponivel; // Pode ser true ou false

    // Se não houver filtros selecionados, mostra todos
    if (!filtros.caracteristicas && !filtros.cep && !filtros.disponivel) {
      this.cuidadoresFiltrados = this.todosCuidadores;
      return;
    }

    console.log('Filtros enviados:', filtros);

    this.cuidadorService.getCuidadoresFiltrados(filtros).subscribe({
      next: (data) => {
        this.cuidadoresFiltrados = data;
      },
      error: (err) => {
        console.error('Erro ao filtrar cuidadores:', err);
      }
    });
  }
}
