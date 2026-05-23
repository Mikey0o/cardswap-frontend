import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OfferService } from '../../services/offer';

@Component({
  selector: 'app-offer-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offer-list.html',
  styleUrl: './offer-list.css'
})
export class OfferList implements OnInit {
  offers: any[] = [];
  loading = true;
  error = '';
  traderId = '6a09c0536a009fff7c86fcbe';

  constructor(private offerService: OfferService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.offerService.getOffersByTrader(this.traderId).subscribe({
      next: (data) => {
        this.offers = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'No se pudieron cargar las ofertas';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      pendiente: 'Pendiente',
      aceptada: 'Aceptada',
      rechazada: 'Rechazada'
    };
    return labels[status] || status;
  }
}