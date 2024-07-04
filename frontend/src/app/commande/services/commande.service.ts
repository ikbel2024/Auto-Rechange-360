import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:3000'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) { }

  getProduits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produits`);
  }

  addProduitToCart(produitId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/panier`, { produitId, quantity });
  }

  getCartItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/panier`);
  }

  removeCartItem(produitId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/panier/${produitId}`);
  }

  updateCartItemQuantity(produitId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/panier/${produitId}`, { quantity });
  }

  checkout(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/commande`, orderData);
  }

  getOrderStatus(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/commande/${orderId}/status`);
  }
   // getCartItems(): Observable<any[]> {
    // const items = [
      // { id: 1, name: 'Produit 1', price: 10.00, quantity: 1 },
      // { id: 2, name: 'Produit 2', price: 20.00, quantity: 2 },
      // { id: 3, name: 'Produit 3', price: 30.00, quantity: 1 }
    // ];
    // return of(items);
  // }
}
