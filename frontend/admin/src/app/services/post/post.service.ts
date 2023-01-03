import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchPaginatorParams } from 'src/app/constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  queryPostList(queryParams: SearchPaginatorParams): Observable<any> {
    return this.http.get('/api/post/query', { params: queryParams as any });
  }
}
