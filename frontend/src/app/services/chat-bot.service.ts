import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  private baseUrl = 'http://localhost:3000'; // Modifier l'URL si nécessaire

  constructor(private http: HttpClient) { }

  // Méthode pour envoyer une question au chatbot
  sendQuestion(question: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chat`, { question });
  }
}
