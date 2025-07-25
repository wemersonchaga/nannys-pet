import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Verifique se o caminho está correto

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  // Variável para exibir a mensagem de erro na tela
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializa o formulário reativo com os campos e validadores
    this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  /**
   * Método chamado quando o formulário é enviado.
   */
  onSubmit() {
    // Limpa mensagens de erro anteriores
    this.errorMessage = null;

    // Verifica se o formulário é válido antes de continuar
    if (this.loginForm.invalid) {
      return; // Interrompe a execução se o formulário não for válido
    }
    
    // Chama o serviço de autenticação com os dados do formulário
    this.authService.login(
      this.loginForm.get('username')!.value,
      this.loginForm.get('password')!.value
    ).subscribe({
      // Callback para sucesso
      next: () => {
        // Navega para a página 'home' após o login bem-sucedido
        this.router.navigate(['/home']);
      },
      // Callback para erro
      error: (err) => {
        console.error('Falha no login:', err); // Mantém o log do erro no console para debug
        // Define uma mensagem de erro amigável para o usuário
        this.errorMessage = 'Usuário ou senha inválidos. Tente novamente.';
      }
    });
  }
}