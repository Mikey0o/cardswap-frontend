import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OfferService } from '../../services/offer';

@Component({
  selector: 'app-offer-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './offer-form.html',
  styleUrl: './offer-form.css'
})
export class OfferForm {
  offerData = {
    idTrader: '6a09c0536a009fff7c86fcbe',
    idCardOffered: '',
    idCardWanted: ''
  };

  loading = false;
  success = false;
  error = '';

  constructor(private offerService: OfferService, private router: Router, private cdr: ChangeDetectorRef) {}

  onSubmit() {
    if (!this.offerData.idCardOffered || !this.offerData.idCardWanted) {
      this.error = 'Todos los campos son requeridos';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.error = '';

    this.offerService.createOffer(this.offerData).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/offers']), 1500);
      },
      error: () => {
        this.error = 'Error al crear la oferta. Intenta de nuevo.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}