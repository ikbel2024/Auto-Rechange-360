import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ConsumerProductService {

 // Placeholder method for searching product by name
 searchProductByName(productName: string): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/search/${productName}`);
}
  private apiUrl = 'http://localhost:3000/ProduitR';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/show`);
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/find/${id}`);
  }


  // Add a product
  addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product);
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  deleteProductByName(productName: string): Observable<any> {
    const url = `${this.apiUrl}/deleteByName/${encodeURIComponent(productName)}`;
    return this.http.delete<any>(url);
  }

  // Update a product
  updateProduct(product: Product, id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, product);
  }

  // Find product by name
  findProduitName(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/name/${name}`);
  }

  // Method to count products by category
  countProductsByCategory(category: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/countp?category=${category}`);
  }
}
