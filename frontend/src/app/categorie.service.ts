import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:3000/Stock'; // Adjust the URL to match your API endpoint
  private delUrl = 'http://localhost:3000/produit';

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
  deleteProduit(id: string): Observable<any> {
    return this.http.delete(`${this.delUrl}/delete/${id}`);

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
//____________________________________________________________________________________________________

countAllProducts(): Observable<{ count: number }> {
  return this.http.get<{ count: number }>(`${this.apiUrl}/count`);
}
countProductsByCategory(category: string): Observable<{ count: number }> {
  return this.http.get<{ count: number }>(`${this.delUrl}/countProductsByCategory?category=${category}`);
}
//____________________________________________________________________________________________________
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
      return this.http.get<any>(`${this.delUrl}/name/${name}`);
    }





/*
    deleteProductByName(productName: string): Observable<any> {
      const url = `${this.apiUrl}/deleteByName/${encodeURIComponent(productName)}`;
      return this.http.delete(url);
    }
    searchProductByName(productName: string) {
     // return this.http.get<Product[]>(`${this.apiUrl}/search/${productName}`);
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
