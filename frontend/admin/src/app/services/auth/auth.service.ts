import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/constants/interfaces';

export interface LoginParams {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(params: LoginParams): Observable<Response> {
    return this.http.post('/api/user/login', params) as Observable<Response>;
  }
}
