import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'http://localhost:3000/api/v1/cards';

  constructor(private http: HttpClient) { }

  createCard(cardData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cardData, { withCredentials: true });
  }

  getCards(type: string = 'todos'): Observable<any> {
    return this.http.get(`${this.apiUrl}/${type}`, { withCredentials: true });
  }

  getCard(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/detail/${id}`, { withCredentials: true });
  }

  editCard(id: string, cardData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, cardData, { withCredentials: true });
  }

  patchCardReview(id: string, reviewData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, reviewData, { withCredentials: true });
  }

  deleteCard(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
