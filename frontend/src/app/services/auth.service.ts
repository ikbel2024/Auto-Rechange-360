import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; mot_de_passe: string }): Observable<{ role: string; token: string }> {
    return this.http.post<{ role: string; token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      map(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Stocker le rôle de l'utilisateur
        return response;
      }),
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 404) {
          errorMessage = 'User not found';
        } else if (error.status === 400) {
          errorMessage = 'Invalid credentials';
        }
        return throwError(errorMessage);
      })
    );
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  register(user: {
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    num_tel: string;
    mot_de_passe: string;
    role: string;
    matricule_fiscale: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 400) {
          errorMessage = 'Registration error';
        }
        return throwError(errorMessage);
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        return throwError(errorMessage);
      })
    );
  }

  banUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/ban`, { userId }).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        return throwError(errorMessage);
      })
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(error => {
        let errorMessage = 'An unknown error occurred!';
        return throwError(errorMessage);
      })
    );
  }
}

