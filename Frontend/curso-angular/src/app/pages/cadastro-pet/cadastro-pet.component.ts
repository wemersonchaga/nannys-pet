import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cadastro-pet',
  templateUrl: './cadastro-pet.component.html',
  styleUrl: './cadastro-pet.component.css'
})

export class CadastroPetComponent {
  petForm: FormGroup;
  fotoSelecionada: File | null = null;
  loading = false;
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.petForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: [''],
      porte: ['pequeno', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]],
      genero: ['Macho', Validators.required],
      castrado: [false, Validators.required],
      observacoes: ['']
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fotoSelecionada = file;
    }
  }

  onSubmit(): void {
    if (this.petForm.invalid) return;

    this.loading = true;
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const formData = new FormData();
    for (const campo in this.petForm.value) {
      formData.append(campo, this.petForm.value[campo]);
    }
    if (this.fotoSelecionada) {
      formData.append('foto', this.fotoSelecionada);
    }

    this.http.post(`${environment.apiUrl}/pets/`, formData).subscribe({
      next: () => {
        this.mensagemSucesso = 'Pet cadastrado com sucesso!';
        this.petForm.reset();
        this.fotoSelecionada = null;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.mensagemErro = 'Erro ao cadastrar pet. Verifique os campos.';
        this.loading = false;
      }
    });
  }
}