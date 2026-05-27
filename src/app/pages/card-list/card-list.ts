import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardService } from '../../services/card'

@Component({
  selector: 'app-card-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardListComponent implements OnInit {
  cards: any[] = [];
  loading = true;
  error = '';

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.loading = true;
    this.error = '';

    this.cardService.getCards('todos').subscribe({
      next: (res) => {
        console.log('Respuesta completa del backend:', res);
        this.cards = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = err.error?.message || 'Error al cargar las cartas';
        this.loading = false;
      }
    });
  }

  deleteCard(card: any): void {
    if (!confirm(`¿Eliminar la carta ${card.edition}?`)) return;

    this.cardService.deleteCard(card._id).subscribe({
      next: () => {
        this.cards = this.cards.filter(c => c._id !== card._id);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al eliminar la carta';
      }
    });
  }

  getReviewLabel(state: string): string {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      aprobado: 'Aprobada',
      rechazado: 'Rechazada'
    };
    return labels[state] ?? state;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      disponible: 'Disponible',
      en_trade: 'En Trade',
      cerrada: 'Cerrada'
    };
    return labels[status] ?? status;
  }
}
