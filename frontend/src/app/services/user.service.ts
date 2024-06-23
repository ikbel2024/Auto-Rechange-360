import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../model/user';
import { RegisterResponse } from '../model/register-response.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';  // URL de l'API
  authToken: any;

  constructor(private http: HttpClient ,   private authService: AuthService 
  ) {}

  // Obtenez le jeton de quelque part (par exemple, à partir d'un service d'authentification)
  private getToken(): string {
    return localStorage.getItem('authToken') || ''; // Exemple : stocké dans le localStorage
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getUsers(): Observable<User[]> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching users:', error);
          return throwError('Error fetching users. Please try again later.'); // Personnaliser la gestion des erreurs selon les besoins de votre application
        })
      );
  }


  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
