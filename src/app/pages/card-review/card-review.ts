import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardService } from '../../services/card'

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-card-review',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './card-review.html',
  styleUrl: './card-review.css',
})
export class CardReviewComponent implements OnInit {
  pendingCards: any[] = [];
  rejectedCards: any[] = [];
  loading = true;
  error = '';

  // ── Estado del panel de revisión ──
  selectedCard: any = null;
  reviewData = {
    reviewState: '',
    reason: ''
  };
  reviewError = '';
  reviewLoading = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      pending: this.cardService.getCards('pendiente'),
      rejected: this.cardService.getCards('rechazado')
    }).subscribe({
      next: ({ pending, rejected }) => {
        this.pendingCards = pending.data;
        this.rejectedCards = rejected.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al cargar las cartas';
        this.loading = false;
      }
    });
  }

  // ── Abrir panel de revisión ──
  openReview(card: any): void {
    this.selectedCard = card;
    this.reviewData = { reviewState: '', reason: '' };
    this.reviewError = '';
  }

  closeReview(): void {
    this.selectedCard = null;
    this.reviewError = '';
  }

  // ── Validación del panel ──
  validateReview(): boolean {
    if (!this.reviewData.reviewState) {
      this.reviewError = 'Debes seleccionar un estado';
      return false;
    }

    if (this.reviewData.reviewState === 'rechazado' && !this.reviewData.reason.trim()) {
      this.reviewError = 'El motivo es obligatorio al rechazar una carta';
      return false;
    }

    return true;
  }

  submitReview(): void {
    if (!this.validateReview()) return;

    this.reviewLoading = true;
    this.reviewError = '';

    this.cardService.patchCardReview(this.selectedCard._id, this.reviewData).subscribe({
      next: () => {
        this.pendingCards = this.pendingCards.filter(c => c._id !== this.selectedCard._id);
        this.rejectedCards = this.rejectedCards.filter(c => c._id !== this.selectedCard._id);
        this.reviewLoading = false;
        this.closeReview();
      },
      error: (err) => {
        this.reviewError = err.error?.message || 'Error al enviar la revisión';
        this.reviewLoading = false;
      }
    });
  }
}
