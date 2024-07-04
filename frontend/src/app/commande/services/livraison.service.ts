import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  // Remplace l'URL ci-dessous par celle de ton API backend
  private apiUrl = 'http://localhost:3000/api/livraisons';

  constructor(private http: HttpClient) {}

  getAllLivraisons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getLivraisonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createLivraison(livraison: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, livraison);
  }

  updateLivraison(id: string, livraison: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, livraison);
  }

  deleteLivraison(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
