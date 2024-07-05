// vehicule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../model/vehicule';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = 'http://localhost:3000/vehiculee'; 

  constructor(private http: HttpClient) { }

  getVehicules(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/show`);
  }

  addVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.http.post<Vehicule>(`${this.apiUrl}/add`, vehicule);
  }

  updateVehicule(id: string, vehicule: Vehicule): Observable<Vehicule> {
    return this.http.put<Vehicule>(`${this.apiUrl}/update/${id}`, vehicule);
  }

  deleteVehicule(id: string): Observable<void> {
    console.log(`Tentative de suppression du véhicule avec l'ID ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => console.log(`Suppression réussie du véhicule avec l'ID ${id}`)),
      catchError(error => {
        console.error(`Erreur lors de la suppression du véhicule avec l'ID ${id}`, error);
        throw error; // Relancer l'erreur pour qu'elle soit gérée par le composant appelant
      })
    );
  }
  

  getVehiculeById(id: string): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/find/${id}`);
  }

  searchVehicles(criteria: any): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.apiUrl}/search`, { params: criteria });
  }

  getVehiculeByModele(modele: string): Observable<Vehicule> {
    return this.http.get<Vehicule>(`${this.apiUrl}/findModele/${modele}`);
  }
}
