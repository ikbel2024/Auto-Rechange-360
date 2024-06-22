import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000/api/commandes';
  private cartUrl = 'http://localhost:3000/api/cart'; // URL pour gérer le panier (exemple)

  constructor(private http: HttpClient) {}

  getAllCommandes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCommandeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCommande(commande: any): Observable<any> {
    console.log('Commande créée :', commande);
    return this.http.post<any>(this.apiUrl, commande);
  }

  updateCommande(id: string, commande: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  annulerCommande(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/annuler`, {});
  }

  retournerProduit(id: string, motif: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/retour`, { motifRetour: motif });
  }

  // Nouvelle méthode pour récupérer les articles du panier
  getCartItems(): Observable<any[]> {
    // Exemple : suppose que votre API retourne les articles du panier de cette manière
    return this.http.get<any[]>(this.cartUrl);
  }
}
