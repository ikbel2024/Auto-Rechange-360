import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/show`);
  }

  // Get product by ID
  getProductById(id: String): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/find/${id}`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData);
  }

  /*
  // Add a product
  addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product);
  }*/

  addProductP(productData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data'  // Do not set Content-Type, browser will set it automatically
    });

    return this.http.post(`${this.apiUrl}/addPic`, productData, { headers });
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
  updateProduct(product: Product, id: String): Observable<any> {
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
