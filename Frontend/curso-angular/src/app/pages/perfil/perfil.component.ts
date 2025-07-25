import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error('Erro ao carregar dados do usuário', err);
      }
    });
  }
}
