import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroTutor1Component } from './pages/cadastro-tutor1/cadastro-tutor1.component';
import { CadastroFotoComponent } from './components/cadastro-foto/cadastro-foto.component';
import { ListarCuidadoresComponent } from './pages/listar-cuidadores/listar-cuidadores.component';

import { BuscarCuidadorComponent } from './pages/buscar-cuidador/buscar-cuidador.component';
import { CadastroCuidador1Component } from './pages/cadastro-cuidador1/cadastro-cuidador1.component';
import { CadastroCuidador2Component } from './pages/cadastro-cuidador2/cadastro-cuidador2.component';
import { CadastroCuidador3Component } from './pages/cadastro-cuidador3/cadastro-cuidador3.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { AuthGuard } from './services/auth.service';
const routes: Routes = [
  //{path: '',component: FirstComponentComponent},
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent },
    {path: 'signup', component: SignupComponent },
    {path: 'cadastrar', component: CadastroTutor1Component},
    {path: 'cadastro-foto', component: CadastroFotoComponent},
    {path: 'cuidadores', component: ListarCuidadoresComponent, canActivate: [AuthGuard]},
    {path: 'cadastro-cuidador', component: CadastroCuidador1Component},
    {path: 'cadastro-cuidador-2', component: CadastroCuidador2Component},
    {path: 'cadastro-cuidador-3', component: CadastroCuidador3Component},
    {path: 'buscar-cuidador', component: BuscarCuidadorComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
