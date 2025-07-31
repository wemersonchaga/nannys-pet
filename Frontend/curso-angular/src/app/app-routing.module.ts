import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroTutorComponent } from './pages/cadastro-tutor/cadastro-tutor.component';
import { CadastroFotoComponent } from './components/cadastro-foto/cadastro-foto.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EscolherPerfilComponent } from './pages/escolher-perfil/escolher-perfil.component';
import { BuscarCuidadorComponent } from './pages/buscar-cuidador/buscar-cuidador.component';
import { CadastroCuidadorComponent } from './pages/cadastro-cuidador/cadastro-cuidador.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { AuthGuard } from './services/auth.service';
import { EditarPerfilTutorComponent } from './pages/editar-perfil-tutor/editar-perfil-tutor.component';
import { EditarPerfilCuidadorComponent } from './pages/editar-perfil-cuidador/editar-perfil-cuidador.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'editar-perfil-tutor', component: EditarPerfilTutorComponent },
  { path: 'editar-perfil-cuidador', component: EditarPerfilCuidadorComponent },
  { path: 'escolher-perfil', component: EscolherPerfilComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-tutor', component: CadastroTutorComponent },  // <-- alterado aqui
  { path: 'cadastro-foto', component: CadastroFotoComponent },
  { path: 'cadastro-cuidador', component: CadastroCuidadorComponent },
  { path: 'buscar-cuidador', component: BuscarCuidadorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
