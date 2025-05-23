// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';

// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   role: 'patient' | 'staff' | 'admin';
//   token: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject = new BehaviorSubject<User | null>(null);
//   public currentUser$ = this.currentUserSubject.asObservable();
//   private apiUrl = `${environment.apiUrl}/auth`;

//   constructor(private http: HttpClient, private router: Router) {
//     // Check if user is stored in localStorage on initialization
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       this.currentUserSubject.next(JSON.parse(storedUser));
//     }
//   }

//   login(email: string, password: string, role: string): Observable<User> {
//     return this.http
//       .post<User>(`${this.apiUrl}/login`, { email, password, role })
//       .pipe(
//         tap(user => {
//           // Store user details and token in local storage
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           this.currentUserSubject.next(user);
//         })
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/login']);
//   }

//   get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   isLoggedIn(): boolean {
//     return !!this.currentUserValue?.token;
//   }

//   hasRole(role: string): boolean {
//     return this.currentUserValue?.role === role;
//   }

//   // For testing if token is still valid
//   validateToken(): Observable<{ valid: boolean }> {
//     return this.http.get<{ valid: boolean }>(`${this.apiUrl}/validate-token`);
//   }
// }


// auth.service.ts - Modified for client-side only routing
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'patient' | 'staff' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Check if user is stored in localStorage on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Mock login - doesn't make actual API calls
  login(email: string, password: string, role: string): Observable<User> {
    // Create a mock user object
    const mockUser: User = {
      id: '123456',
      username: email.split('@')[0],
      email: email,
      role: role as 'patient' | 'staff' | 'admin'
    };
    
    // Store user in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    console.log('lockeind in', mockUser);
    
    return of(mockUser);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(role: string): boolean {
    return this.currentUserValue?.role === role;
  }
}