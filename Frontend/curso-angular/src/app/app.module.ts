import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { ParentDataComponent } from './components/parent-data/parent-data.component';
import { DirectivesComponent } from './components/directives/directives.component';
import { IfRenderComponent } from './components/if-render/if-render.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EmitterComponent } from './components/emitter/emitter.component';
import { ChangeNumberComponent } from './components/change-number/change-number.component';
import { ListRenderComponent } from './components/list-render/list-render.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroTutorComponent } from './pages/cadastro-tutor/cadastro-tutor.component';
import { CadastroFotoComponent } from './components/cadastro-foto/cadastro-foto.component';
import { BuscarCuidadorComponent } from './pages/buscar-cuidador/buscar-cuidador.component';
import { CadastroCuidadorComponent } from './pages/cadastro-cuidador/cadastro-cuidador.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { AuthService, AuthInterceptor, AuthGuard } from './services/auth.service';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilTutorComponent } from './pages/editar-perfil-tutor/editar-perfil-tutor.component';
import { EditarPerfilCuidadorComponent } from './pages/editar-perfil-cuidador/editar-perfil-cuidador.component';
import { EscolherPerfilComponent } from './pages/escolher-perfil/escolher-perfil.component';
import { CadastroPetComponent } from './pages/cadastro-pet/cadastro-pet.component';
import { DetalhesPetComponent } from './pages/detalhes-pet/detalhes-pet.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    ParentDataComponent,
    DirectivesComponent,
    IfRenderComponent,
    EventosComponent,
    EmitterComponent,
    ChangeNumberComponent,
    ListRenderComponent,
    PipesComponent,
    TwoWayBindingComponent,
    HomeComponent,
    CadastroTutorComponent,
    CadastroFotoComponent,
    BuscarCuidadorComponent,
    CadastroCuidadorComponent,
    LoginComponent,
    SignupComponent,
    PerfilComponent,
    EditarPerfilTutorComponent,
    EditarPerfilCuidadorComponent,
    EscolherPerfilComponent,
    CadastroPetComponent,
    DetalhesPetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot() // <-- IMPORTANTE!
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
