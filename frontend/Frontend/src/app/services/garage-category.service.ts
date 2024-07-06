import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GarageCategory } from '../model/garage-category.model';

@Injectable({
  providedIn: 'root'
})
export class GarageCategoryService {
  private readonly BASE_URL: string = 'http://localhost:4000/garageCategory';

  constructor(private http: HttpClient) {}

  // Obtenir toutes les catégories de garage
  getAllGarageCategories(): Observable<GarageCategory[]> {
    return this.http.get<GarageCategory[]>(`${this.BASE_URL}/show`);
  }

  // Ajouter une nouvelle catégorie de garage
  addGarageCategory(category: GarageCategory): Observable<GarageCategory> {
    return this.http.post<GarageCategory>(`${this.BASE_URL}/add`, category);
  }

  // Mettre à jour une catégorie de garage existante
  updateGarageCategory(id: string, category: GarageCategory): Observable<GarageCategory> {
    return this.http.put<GarageCategory>(`${this.BASE_URL}/update/${id}`, category);
  }

  // Supprimer une catégorie de garage
  deleteGarageCategory(id: string): Observable<void> {
    const url = `${this.BASE_URL}/delete/${id}`;
    return this.http.delete<void>(url);
  }

  // Obtenir les catégories de garage à proximité
  getNearbyGarageCategories(latitude: number, longitude: number, distance: number): Observable<any> {
    const url = `${this.BASE_URL}/rechercher-proximite`;
    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('distance', distance.toString());
    return this.http.get<GarageCategory[]>(url, { params });
  }
}
