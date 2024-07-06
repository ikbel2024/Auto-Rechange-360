// src/app/services/historique.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Historique } from '../model/historique';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addHistorique(historique: Historique): Observable<Historique> {
    return this.http.post<Historique>(`${this.apiUrl}/vehiculee/addHistorique`, historique);
  }

  getMaintenanceDays(vehiculeId: string): Observable<Historique[]> {
    return this.http.get<Historique[]>(`${this.apiUrl}/vehiculee/getMaintenanceDays/${vehiculeId}`);
  }
}
