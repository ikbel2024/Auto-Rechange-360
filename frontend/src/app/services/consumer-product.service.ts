import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../model/Stock';


@Injectable({
  providedIn: 'root'
})

export class ConsumerProductService {



  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  private apiUrl = 'http://localhost:3000/produit/show';
  private AddProduitUrl = 'http://localhost:3000/produit/add';
  private updateProduitUrl = 'http://localhost:3000/produit/update';
  private deleteProduitUrl = 'http://localhost:3000/produit/delete';  // Correct the URL
  private getProduitIdURL = 'http://localhost:3000/produit/';
  private filterUrl = 'http://localhost:3000/produit/filter';



  constructor(private _httpClient: HttpClient) { }

  // Get all products
  getProducts() {
    return this._httpClient.get<any[]>(this.apiUrl);
  }



  addProduit(produitData: any) {
    return this._httpClient.post<any>(this.AddProduitUrl, produitData);
  }
  getProductById(id: any){
    const url = `${this.getProduitIdURL}/${id}`;
    console.log('Fetching product with ID:', id); // Affichez l'ID du produit
    console.log('URL:', url); // Affichez l'URL construite pour le GET

    return this._httpClient.get<any>(url);
  }

  deleteProduit(id: any) {
    const deleteUrl = `${this.deleteProduitUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateProduit(formData: FormData, productId:any) {
    console.log('formData', formData)
    return this._httpClient.put<any>(`${this.updateProduitUrl}/${productId}`, formData);
  }



  // Get filtered products
  getFilteredProducts(filters: any): Observable<any[]> {
    return this._httpClient.post<any[]>(this.filterUrl, filters, this.httpOptions);
  }

}
