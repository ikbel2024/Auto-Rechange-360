import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
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

  // src/app/services/user.service.ts
register(user: User): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, user);
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

  

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/resetpassword/${token}`, { newPassword });
  }


banUser(userId: string): Observable<any> {

  const token = this.authService.getToken();

    if (!token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return this.http.put<any>(`${this.apiUrl}/ban/${userId}`, {headers});
}

unbanUser(userId: string): Observable<any> {
  const token = this.authService.getToken();

  if (!token) {
    throw new Error('No token available');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.put<any>(`${this.apiUrl}/unban/${userId}`, {headers});
}

getUserRoleStatistics(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/stats/role`);
}

getUserLoginStatistics(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/stats/login`);
}

getBannedUserStatistics(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/stats/banned`);
}

getUserRegistrationStatistics(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/stats/registration`);
}
getUserProfile(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/users/${userId}`);
}
uploadProfilePhoto(userId: string, photoUrl: string): Observable<any> {
  const body = { userId, photoUrl };
  return this.http.post(`${this.apiUrl}/upload-profile-photo`, body);
}
getUserDetails(userId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/user/${userId}`).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

getUsersBanned(): Observable<User[]> {
  // Appel à votre UserService pour récupérer uniquement les utilisateurs bannis
  return this.getUsers().pipe(
    map((users: User[]) => users.filter(user => user.isBanned))
  );
}



}
