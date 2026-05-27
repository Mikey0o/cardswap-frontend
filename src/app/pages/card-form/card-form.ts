import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CardService } from '../../services/card';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './card-form.html',
  styleUrls: ['./card-form.css']
})
export class CardFormComponent implements OnInit {

  // ── Modo del formulario ──
  isEditMode = false;
  cardId: string | null = null;

  // ── Estado UI ──
  loading = false;
  loadingCard = false;
  error = '';
  success = '';

  // ── Opciones de los enums ──
  conditionOptions = [
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'usado', label: 'Usado' },
    { value: 'dañado', label: 'Dañado' }
  ];

  languageOptions = [
    'Español', 'Inglés', 'Japonés', 'Francés', 'Alemán', 'Portugués'
  ];

  // ── Modelo del formulario ──
  formData = {
    name: '',
    condition: '',
    edition: '',
    language: '',
  };

  // ── Errores por campo ──
  fieldErrors: Record<string, string> = {};

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cardId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.cardId;

    if (this.isEditMode && this.cardId) {
      this.loadCard(this.cardId);
    }
  }

  loadCard(id: string): void {
    this.loadingCard = true;

    this.cardService.getCard(id).subscribe({
      next: (res) => {
        const card = res;
        this.formData = {
          name: card.name,
          condition: card.condition,
          edition: card.edition,
          language: card.language,
        };
        this.loadingCard = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al cargar la carta';
        this.loadingCard = false;
      }
    });
  }

  validate(): boolean {
    this.fieldErrors = {};

    if (!this.formData.name || this.formData.name.length < 5) {
      this.fieldErrors['name'] = "El nombre debe tener mínimo 8 caracteres";
    }

    if (!this.formData.condition) {
      this.fieldErrors['condition'] = "Selecciona una condición";
    }

    if (!this.formData.edition || this.formData.edition.length < 8) {
      this.fieldErrors['edition'] = "La edición debe tener mínimo 8 caracteres";
    }

    if (!this.formData.language) {
      this.fieldErrors['language'] = "El idioma es obligatorio";
    }

    return Object.keys(this.fieldErrors).length === 0;
  }

  onSubmit(): void {
    if (!this.validate()) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    const request$ = this.isEditMode && this.cardId
      ? this.cardService.editCard(this.cardId, this.formData)
      : this.cardService.createCard(this.formData);

    request$.subscribe({
      next: () => {
        this.success = this.isEditMode
          ? 'Carta actualizada exitosamente'
          : 'Carta creada exitosamente';
        this.loading = false;

        setTimeout(() => this.router.navigate(['/cards/list']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar la carta';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/cards/list']);
  }
}