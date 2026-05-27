import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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
  traderId = localStorage.getItem('userId') ?? '';
  userRole = localStorage.getItem('userRole')?.toLowerCase() ?? '';

  constructor(
    private offerService: OfferService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.offerService.getOffers('todos').subscribe({
      next: (data) => {
        this.offers = data.data ?? data;
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

  acceptOffer(offer: any) {
    const id = offer._id || offer.id;
    if (!id) {
      console.error("No se encontró el ID en el objeto:", offer);
      return;
    }
    this.offerService.acceptOffer(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => {
        console.error("Error al aceptar la oferta:", err);
        alert("No se pudo aceptar la oferta.");
      }
    });
  }

  rejectOffer(offer: any) {
    const id = offer._id || offer.id;
    this.offerService.rejectOffer(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => alert('No se pudo rechazar la oferta.')
    });
  }

  withdrawOffer(offer: any) {
    const id = offer._id || offer.id;
    this.offerService.withdrawOffer(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => alert('No se pudo retirar la oferta.')
    });
  }

  confirmDelivery(offer: any) {
    const id = offer._id || offer.id;
    this.offerService.confirmDelivery(id).subscribe({
      next: () => this.ngOnInit(),
      error: () => alert('No se pudo confirmar la entrega.')
    });
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }
}