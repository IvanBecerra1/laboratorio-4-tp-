import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { MayorMenorComponent } from './components/juegos/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
    children: [
      {path : "juegos", component:JuegosComponent},
      {path : "iniciar-sesion", component:LoginComponent},
      {path : "registrarse", component:RegistroComponent},
      {path : "quien-soy", component:QuienSoyComponent},
      {path : "juegos/MayorMenor", component:MayorMenorComponent},
      {path : "juegos/Ahorcado", component:AhorcadoComponent}
    ],
  },
  // Otras rutas principales si es necesario
  // { path: 'otra-ruta', component: OtraComponente }
  { path: '', redirectTo: '/home/juegos', pathMatch: 'full' }, // Redirigir a '/home' por defecto
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
