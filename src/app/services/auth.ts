import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/session/start`, credenciales);
  }

  // Método para registrar usuarios nuevos
  registro(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, datosUsuario);
  }
}