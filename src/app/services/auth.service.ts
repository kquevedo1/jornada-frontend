// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth'; // cambia tu puerto

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasena: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, contrasena })
      .pipe(
        tap(res => {
          // guardar usuario y rol en localStorage
          localStorage.setItem('usuario', res.usuario);
          localStorage.setItem('rol', res.rol);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getRol() {
    return localStorage.getItem('rol');
  }
}
