import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  createOffer(offerData: { idTrader: string; idCardOffered: string; idCardWanted: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/offers`, offerData);
  }

  getOffersByTrader(idTrader: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/offers/${idTrader}`);
  }
}