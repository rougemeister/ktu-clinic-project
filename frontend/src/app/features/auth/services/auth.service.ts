import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface AuthResponse { accessToken: string; user: any; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth';
  user$ = new BehaviorSubject<any>(null);
  accessToken = '';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.api}/login`, credentials, { withCredentials: true })
      .pipe(tap(res => {
        this.accessToken = res.accessToken;
        console.log(this.accessToken)
        this.user$.next(res.user);
      }));
  }

  register(payload: any) {
    return this.http.post(`${this.api}/register`, payload, { withCredentials: true });
  }

  refresh() {
    return this.http.post<{ accessToken: string }>(`${this.api}/refresh`, {}, { withCredentials: true })
      .pipe(tap(res => { this.accessToken = res.accessToken; }));
  }

  logout() {
    this.accessToken = '';
    this.user$.next(null);
    return this.http.post(`${this.api}/logout`, {}, { withCredentials: true });
  }

  me() {
    return this.http.get<{ user: any }>(`${this.api}/me`, { headers: { Authorization: `Bearer ${this.accessToken}` } })
      .pipe(tap(res => this.user$.next(res.user)));
  }
}
