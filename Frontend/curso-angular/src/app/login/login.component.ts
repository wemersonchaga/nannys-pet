import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuidador } from '../Cuidador';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  error: any;
  model: any = {};
  cuidadors: Cuidador[] = [];
  cuidador: Cuidador = {
    nome: '',
    sobrenome: '',
    cpf: '',
    email: '',
    senha: '',
    rua: '',
    data_nascimento: '',
    telefone: '',
    instagram:'',
    cep:'',
    cidade:'',
    estado:'',
    numero:0,
    caracteristicas: {
      estudante_de_veterinaria: false,
      medico_veterinario: false,
      capacidade_adestramento: false,
      aceita_multiplos_pets: false,
      cuidador_comum: false,
      pet_ate_5kg: false,
      pet_5kg_a_10kg: false,
      pet_10kg_a_20kg: false,
      pet_20kg_a_40kg: false,
      so_pet_castrado: false,
      pet_nao_castrado: false,
      pet_femea: false,
      pet_macho: false,
      medicacao_oral: false,
      medicacao_injetavel: false
    }
  };
  constructor(
    private authService: AuthService,
    private router: Router) { }
  ngOnInit() {
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => this.router.navigate(['home']),
      error => this.error = error
    );
  }
  //login(username: string, password: string)  {
     // Aqui você faria a chamada ao seu backend para autenticação
    // console.log('email:', this.model.username);
    // console.log('senha:', this.model.password);
    //if (username == this.cuidador.email && password == this.cuidador.senha) {
      //Redirecionar após login
      //this.error = "Login feito com sucesso!";
      //this.router.navigate(['/home']);
    //} else {
      //this.error = "E-mail ou a senha estar errado!";
    //}
  //}
}






//export class LoginComponent {
  

  //onSubmit() {
    // Aqui você faria a chamada ao seu backend para autenticação
   // console.log('email:', this.model.username);
   // console.log('senha:', this.model.password);
    // Redirecionar após login
    //this.router.navigate(['/home']);
  //}
//}
