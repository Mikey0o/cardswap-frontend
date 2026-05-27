import { Routes } from '@angular/router';
import { OfferList } from './pages/offer-list/offer-list';
import { OfferForm } from './pages/offer-form/offer-form';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';
import { InicioComponent } from './pages/inicio/inicio';

import { roleGuard } from './guards/role-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent, canActivate: [roleGuard(['usuario', 'moderador','admin'])] },
  { path: 'inicio', component: InicioComponent,  },
  { path: 'offers', component: OfferList, canActivate: [roleGuard(['usuario', 'admin'])] },
  { path: 'offers/new', component: OfferForm, canActivate: [roleGuard(['usuario', 'admin'])] },
  {
    path: 'cards', children: [
      { path: 'list', loadComponent: () => import('./pages/card-list/card-list').then(m => m.CardListComponent), canActivate: [roleGuard(["admin", "usuario"])] },
      { path: 'new', loadComponent: () => import('./pages/card-form/card-form').then(m => m.CardFormComponent), canActivate: [roleGuard(["admin", "usuario"])] },
      { path: 'edit/:id', loadComponent: () => import('./pages/card-form/card-form').then(m => m.CardFormComponent), canActivate: [roleGuard(["admin", "usuario"])] }
    ]
  },
  {
    path: 'moderator/cards',
    loadComponent: () => import('./pages/card-review/card-review').then(m => m.CardReviewComponent),
    canActivate: [roleGuard(['moderador', 'admin'])]
  },
  { path: '**', redirectTo: 'login' },
];