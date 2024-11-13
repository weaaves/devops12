import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface AuthResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, { username, password }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('access_token', response.access);
        this.currentUserSubject.next({ username });
        console.log('Access token saved:', response.access);
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post(`${this.apiUrl}/register/`,
      { username, password, email },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
