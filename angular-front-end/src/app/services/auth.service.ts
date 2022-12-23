import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { userLogin } from '../interfaces/userLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3001/auth/users', user); //TODO: do url here!
  }

  login(user: userLogin): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://localhost:3001/auth/login', user)
    .pipe(
      tap(
        ({token}) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        }
      )
    )
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken('');
    localStorage.clear();
  }

}
