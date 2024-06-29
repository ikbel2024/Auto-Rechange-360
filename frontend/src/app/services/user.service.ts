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
  /*requestPasswordReset(email: any) {
    throw new Error('Method not implemented.');
  }*/
  
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

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user._id}`, user);
  }

  deleteUser(user: User): Observable<void> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/users/${user._id}` , { headers });
  }
  
  requestPasswordReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/request-reset-password`, { email });
  }

  

  resetPassword(resetToken: string, password: string): Observable<void> {
    console.log('Sending reset password request with token:', resetToken, 'and password:', password);
    return this.http.post<void>(`${this.apiUrl}/resetpassword/${resetToken}`, { password }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error resetting password:', error);
        return throwError(error);
      })
    );
}

banUser(userId: string): Observable<any> {

  const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return this.http.put<any>(`${this.apiUrl}/users/${userId}/ban`, {headers});
}

unbanUser(userId: string): Observable<any> {
  const token = this.authService.getToken();

  if (!token) {
    throw new Error('No token available');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<any>(`${this.apiUrl}/users/${userId}/unban`, {headers});
}
}
