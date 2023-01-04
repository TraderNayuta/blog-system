import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, SearchPaginatorParams } from 'src/app/constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  queryPostList(queryParams: SearchPaginatorParams): Observable<any> {
    return this.http.get('/api/post/query', { params: queryParams as any });
  }

  queryPostDetail(postId: number): Observable<any> {
    return this.http.get(`/api/post/query/${postId}`);
  }

  createPost(params: Post): Observable<any> {
    return this.http.post('/api/post/create', params);
  }

  updatePost(postId: number, params: Post): Observable<any> {
    return this.http.put(`/api/post/${postId}`, params);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`/api/post/delete/${postId}`);
  }
}
