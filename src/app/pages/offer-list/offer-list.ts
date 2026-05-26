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
  traderId = localStorage.getItem('userId') ?? '';

  constructor(private offerService: OfferService, private cdr: ChangeDetectorRef) {}

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
  console.log('ID de la oferta:', id);
  console.log('Oferta completa:', offer);

  if (!id) {
    console.error("No se encontró el ID en el objeto:", offer);
    return;
  }

  // 2. Llamamos al servicio que acabamos de crear
  this.offerService.acceptOffer(id).subscribe({
    next: (res) => {
      console.log("¡Oferta aceptada con éxito!");
      // Recargamos la lista para actualizar los estados
      this.ngOnInit(); 
    },
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
}