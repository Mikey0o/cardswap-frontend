import { Routes } from '@angular/router';
import { OfferList } from './pages/offer-list/offer-list';
import { OfferForm } from './pages/offer-form/offer-form';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { InicioComponent } from './pages/inicio/inicio';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'offers', component: OfferList },
  { path: 'offers/new', component: OfferForm },
  { path: '**', redirectTo: 'login' }
];