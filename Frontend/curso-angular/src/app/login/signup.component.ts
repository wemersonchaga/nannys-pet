import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
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
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  } // 👈 Fechamento do construtor estava faltando

  ngOnInit(): void {}

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) return;

    this.isSubmitting = true;

    const { nome, email, password, confirmPassword } = this.signupForm.value;

    const signupData = {
      username: nome,
      first_name: nome,
      email,
      password
    };

    this.authService.signup(signupData).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        if (error.error && typeof error.error === 'object') {
          const firstError = Object.values(error.error)[0];
          this.errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        } else {
          this.errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
        }
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
