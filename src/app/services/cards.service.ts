import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private apiUrl = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  updateCard(id: string, card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${id}`, card);
  }

  updateCardColumn(cardId: string, columnId: string): Observable<Card> {
    return this.http.patch<Card>(`${this.apiUrl}/${cardId}`, { column: columnId });
  }

  deleteCard(cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cardId}`);
  }
}
