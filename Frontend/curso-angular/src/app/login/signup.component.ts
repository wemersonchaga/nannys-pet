import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Verifique se o caminho está correto

/**
 * Validador customizado para verificar se os campos de senha e confirmação de senha coincidem.
 */
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  
  // Se as senhas não coincidirem, retorna um erro 'passwordsMismatch'
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializa o formulário reativo com seus controles e validadores
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: passwordsMatchValidator // Aplica o validador customizado ao grupo do formulário
    });
  }

  ngOnInit(): void {}

  /**
   * Método chamado quando o formulário de cadastro é enviado.
   */
  onSubmit() {
    // Limpa mensagens anteriores
    this.errorMessage = null;
    this.successMessage = null;

    // Marca todos os campos como "tocados" para exibir os erros de validação, se houver
    this.signupForm.markAllAsTouched();

    // Interrompe se o formulário for inválido
    if (this.signupForm.invalid) {
      return;
    }

    // Extrai os valores do formulário
    const { username, email, password } = this.signupForm.value;

    // Chama o serviço de autenticação
    // Nota: O serviço só precisa de uma senha, já que validamos a confirmação aqui.
this.authService.signup(username, email, password, password).subscribe({
      next: () => {
        this.successMessage = "Cadastro realizado com sucesso! Redirecionando para o login...";
        // Redireciona para a página de login após 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']); // ou '/home' se preferir
        }, 2000);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        // Define uma mensagem de erro genérica para o usuário
        this.errorMessage = 'Não foi possível realizar o cadastro. Verifique os dados ou tente novamente mais tarde.';
      }
    });
  }
}