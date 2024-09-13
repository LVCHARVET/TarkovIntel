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

  /**
   * Récupère toutes les cartes depuis le serveur.
   * @returns {Observable<Card[]>} - Une liste observable de cartes.
   */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  /**
   * Crée une nouvelle carte sur le serveur.
   * @param {Card} card - La carte à créer.
   * @returns {Observable<Card>} - La carte créée.
   */
  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  /**
   * Met à jour une carte sur le serveur.
   * @param {string} id - L'ID de la carte à mettre à jour.
   * @param {Card} card - Les données de la carte mises à jour.
   * @returns {Observable<Card>} - La carte mise à jour.
   */
  updateCard(id: string, card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${id}`, card);
  }

  /**
   * Met à jour la colonne d'une carte.
   * @param {string} cardId - L'ID de la carte à déplacer.
   * @param {string} columnId - L'ID de la nouvelle colonne.
   * @returns {Observable<void>} - Un observable indiquant que la colonne a été mise à jour.
   */
  updateCardColumn(cardId: string, columnId: string): Observable<Card> {
    return this.http.patch<Card>(`${this.apiUrl}/${cardId}`, { column: columnId });
  }

  /**
   * Supprime une carte sur le serveur.
   * @param {string} cardId - L'ID de la carte à supprimer.
   * @returns {Observable<void>} - Un observable indiquant que la carte a été supprimée.
   */
  deleteCard(cardId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cardId}`);
  }
}
