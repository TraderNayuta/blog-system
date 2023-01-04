import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  queryTagList(): Observable<any> {
    return this.http.get('/api/tag/query');
  }

  createTag(params: Tag): Observable<any> {
    return this.http.post('/api/tag/create', params);
  }

  updateTag(id: number, params: Tag): Observable<any> {
    return this.http.put(`/api/tag/${id}`, params);
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(`/api/tag/delete/${id}`);
  }
}
