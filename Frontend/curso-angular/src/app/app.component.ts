// Em: src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; // Verifique o caminho

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuAberto = false;

  // Injetamos o AuthService como public para usá-lo no template com o async pipe
  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }
  
  // O método de logout já chama o serviço, que por sua vez atualiza o BehaviorSubject
  fazerLogout() {
    this.fecharMenu();
    this.authService.logout();
  }
}