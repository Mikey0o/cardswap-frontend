import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { InicioComponent } from './pages/inicio/inicio';

export const routes: Routes = [
  // Si entras a http://localhost:4200/ te manda directo a /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Definimos las páginas oficiales
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  
  // Si escriben cualquier locura en la URL, los regresa al Login
  { path: '**', redirectTo: 'login' }
];