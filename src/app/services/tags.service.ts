import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private apiUrl = 'http://localhost:3000/tags';

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les tags depuis le serveur.
   * @returns {Observable<Tag[]>} - Une liste observable de tags.
   */
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }
  
  /**
   * Crée un nouveau tag sur le serveur.
   * @param {Tag} tag - Le tag à créer.
   * @returns {Observable<Tag>} - Le tag créé.
   */
  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }
}
