import { Routes } from '@angular/router';
import { OfferList } from './pages/offer-list/offer-list';
import { OfferForm } from './pages/offer-form/offer-form';

export const routes: Routes = [
  { path: '', redirectTo: 'offers', pathMatch: 'full' },
  { path: 'offers', component: OfferList },
  { path: 'offers/new', component: OfferForm },
];