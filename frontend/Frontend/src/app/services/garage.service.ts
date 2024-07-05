import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Garage, Review } from '../model/garage.model';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  private readonly BASE_URL: string = 'http://localhost:4000/garage';

  constructor(private http: HttpClient) {}

  getAllGarageService(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.BASE_URL}/show`).pipe(
      catchError(this.handleError)
    );
  }
  getGarages(): Observable<any[]> {
    const url = `${this.BASE_URL}/show`; // Adapter l'URL à votre API backend
    return this.http.get<any[]>(url);
  }

  getGarageById(id: string): Observable<Garage> {
    return this.http.get<Garage>(`${this.BASE_URL}/getbyid/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  bookAppointment(garageId: string, appointment: Appointment): Observable<any> {
    const url = `${this.BASE_URL}/${garageId}/appointments`;
    return this.http.post(url, appointment).pipe(
      catchError(error => {
        console.error('Error booking appointment:', error);
        throw error; // Rethrow the error for further handling
      })
    );
  }
  
  getAvailableTimeSlots(): string[] {
    // Dummy implementation, replace with actual logic
    return ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM'];
  }

  deleteGarage(id: string): Observable<any> {
    const url = `${this.BASE_URL}/delete/${id}`; // Endpoint de suppression
    return this.http.delete(url).pipe(
      catchError(this.handleError) // Gestion des erreurs
    );
  }

  

  updateGarageService(id: string, garageData: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/update/${id}`, garageData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  addReview(garageId: string, review: Review): Observable<any> {
    return this.http.post(`${this.BASE_URL}/${garageId}/addReview`, review).pipe(
      catchError(this.handleError)
    );
  }

  addGarage(garage: Garage): Observable<any> {
    return this.http.post(`${this.BASE_URL}/add`, garage).pipe(
      catchError(this.handleError)
    );
  }

  
  getStatsService(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/api/garage/statistics/by-city`);
    
    
  }
  initiateStripePayment(montant: number, token: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/paiement`, { montant, token });
  }
}
  

  

