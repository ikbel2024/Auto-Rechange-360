import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../model/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentserviceService {
  private baseUrl = 'http://localhost:3000/comment';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/show`);
  }
  //private mapPost(post: any): Comment { return { };}

  
  addComment(comment: Comment): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, comment);
  }

  updateComment(id: string, comment: Comment): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, comment);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getCommentById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/commentid/${id}`);
  }

  getCommentsByPostId(idpost: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/commentpost/${idpost}`);
  }

}
