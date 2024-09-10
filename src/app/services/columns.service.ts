import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from '../interfaces/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {
  private apiUrl = 'http://localhost:3000/columns';

  constructor(private http: HttpClient) { }

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(this.apiUrl);
  }
}
