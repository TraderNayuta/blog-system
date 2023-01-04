import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/constants/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  queryCategoryList(): Observable<any> {
    return this.http.get('/api/category/query');
  }

  createCategory(params: Category): Observable<any> {
    return this.http.post('/api/category/create', params);
  }

  updateCategory(id: number, params: Category): Observable<any> {
    return this.http.put(`/api/category/${id}`, params);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`/api/category/delete/${id}`);
  }
}
