import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VinDecodeService {

  private apiUrl = 'http://localhost:3000'; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  // Function to decode VIN with optional model year
  decodeVin(vin: string, modelYear: string = ''): Observable<any> {
    const url = `${this.apiUrl}/decode-vin/${vin}`;
    return this.http.get<any>(url, { params: { modelyear: modelYear } });
  }
}
