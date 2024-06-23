import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, mot_de_passe: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, mot_de_passe }).pipe(
      catchError(this.handleError)
    );
  }

  isAdminUser(): boolean {
    // Implement logic to determine if the user is an admin
    // This is just an example; your actual implementation may vary
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  }
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private handleError(error: any): Observable<never> {
    // Handle error here, maybe log it and rethrow it
    throw error;
  }
}
