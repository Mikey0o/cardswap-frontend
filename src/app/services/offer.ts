import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OfferService {
  // Ajuste: agregamos la 's' al final para que coincida con app.js
  private apiUrl = 'http://localhost:3000/api/v1/offers';

  constructor(private http: HttpClient) {}

  createOffer(offerData: any): Observable<any> {
    // Ahora apunta a /api/v1/offers
    return this.http.post(`${this.apiUrl}`, offerData, { withCredentials: true });
  }

  getOffers(status: string = 'todos'): Observable<any> {
    // Apunta a /api/v1/offers/:type
    return this.http.get(`${this.apiUrl}/${status}`, { withCredentials: true });
  }

  withdrawOffer(id: string): Observable<any> {
    // Apunta a /api/v1/offers/:id/withdraw
    return this.http.patch(`${this.apiUrl}/${id}/withdraw`, {}, { withCredentials: true });
  }

  acceptOffer(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/accept`, {}, { withCredentials: true });
  }

  rejectOffer(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, {}, { withCredentials: true });
  }

  confirmDelivery(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/confirm`, {}, { withCredentials: true });
  }
}