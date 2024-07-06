import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respond } from '../model/respond';

@Injectable({
  providedIn: 'root'
})
export class RespondserviceService {

  private baseUrl = 'http://localhost:3000/respond';

  constructor(private http: HttpClient) {}

  getResponds(): Observable<Respond[]> {
    return this.http.get<Respond[]>(`${this.baseUrl}/show`);
  }

  addRespond(respond: Respond): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, respond);
  }

  updateRespond(id: string, respond: Respond): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, respond);
  }

  deleteRespond(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getRespondById(id: string): Observable<Respond> {
    return this.http.get<Respond>(`${this.baseUrl}/postid/${id}`);
  }

  getRespondsByCommentId(idcomment: string): Observable<Respond[]> {
    return this.http.get<Respond[]>(`${this.baseUrl}/respondcomment/${idcomment}`);
  }

}
