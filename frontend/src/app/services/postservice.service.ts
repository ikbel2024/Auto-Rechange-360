import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {
  private baseUrl = 'http://localhost:3000/post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/show`).pipe(
      map(posts => posts.map(post =>  this.mapPost(post)))
    );
  }

  private mapPost(post: any): Post {
    return {
      id: post._id,
      iduser:post.iduser,
      name: post.name,
      post: post.post,
      likes: post.likes,
      views: post.views
    };
  }

  addPost(post: Post): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, post);
  }

  updatePost(id: string, post: Post): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/postid/${id}`);
  }

  getPostByName(name: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/postone/${name}`);
  }
// Search posts by name
searchPostsByName(name: string): Observable<Post> {
  return this.http.get<Post>(`${this.baseUrl}/postone/${name}`);
}

// Get all posts sorted by views
getPostsByViews(): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.baseUrl}/showviews`);
}

// Get all posts by user ID
getPostsByUserId(iduser: string): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.baseUrl}/showiduser/${iduser}`);
}

// Copy a post with a new user
copyPostWithNewUser(id: string, iduser: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/partagepost/${id}/${iduser}`);
}

// Increment likes for a post
incrementLikes(id: string): Observable<Post> {
  return this.http.get<Post>(`${this.baseUrl}/likepost/${id}`);
}

// Increment views for a post
incrementViews(id: string): Observable<Post> {
  return this.http.get<Post>(`${this.baseUrl}/viewspost/${id}`);
}
}
