import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:3000/ProduitR'; // Adjust the URL to match your API endpoint

  constructor(private http: HttpClient) {}

  addCategorie(Stock: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addS`, Stock);
  }

  deleteCategorie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteS/${id}`);
  }

  updateCategorie(id: string, Stock: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateS/${id}`, Stock);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/showS`);
  }

  getCategorieById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findS/${id}`);
  }

  getCategorieByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findSN/${name}`);
  }

  countTotalStocks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countS`);
  }

  calculateTotalStockQuantity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalQuantity`);
  }


  deleteCategorieByNameS(name: string): Observable<any> {
    const url = `${this.apiUrl}/deleteByNameS/${encodeURIComponent(name)}`;
    return this.http.delete<any>(url);
  }
}
