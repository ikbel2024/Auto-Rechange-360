// vehicule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../model/vehicule';

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
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
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
