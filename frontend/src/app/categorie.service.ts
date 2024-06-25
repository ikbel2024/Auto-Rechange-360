import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:3000/Stock'; // Adjust the URL to match your API endpoint

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/showS`);
  }


  addCategorie(Stock: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addS`, Stock);
  }

  deleteCategorie(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteS/${id}`);
  }

  updateCategorie(id: string, Stock: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateS/${id}`, Stock);
  }


  getCategorieById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findS/${id}`);
  }

  getCategorieByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/findSN/${name}`);
  }

  countProductsByCategory(category: string): Observable<{ count: number }> {
    console.log('Attempting to count products with category:', category); // Log before HTTP request
    return this.http.get<{ count: number }>(`${this.apiUrl}/countp?category=${category}`);
  }

  countTotalStocks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countS`);
  }

  calculateTotalStockQuantity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/totalQuantity`);
  }


  deleteCategorieByNameS(name: string): Observable<any> {
    const url = `${this.apiUrl}/deleteByNameS/${encodeURIComponent(name)}`;
    return this.http.delete<any>(url);}
    //____________________________________________________________________________________________________



    findProduitByName(name: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/name/${name}`);
    }





/*
    deleteProductByName(productName: string): Observable<any> {
      const url = `${this.apiUrl}/deleteByName/${encodeURIComponent(productName)}`;
      return this.http.delete(url);
    }
    searchProductByName(productName: string) {
     // return this.http.get<Product[]>(`${this.apiUrl}/search/${productName}`);
    }



    findProduitName(name: string): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/name/${name}`);
    }

    // Placeholder method for searching product by name
    searchProductByName(productName: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/search/${productName}`);
    }

    // Find product by name
    findProduitName(name: string): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/name/${name}`);
    }

    deleteProductByName(productName: string): Observable<any> {
      const url = `${this.apiUrl}/deleteByName/${encodeURIComponent(productName)}`;
      return this.http.delete<any>(url);
    }




    //______________________________________________________________________________________________________
  */
}
