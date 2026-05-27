import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/v1';

  constructor() {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getOptions() {
    return {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  login(credenciales: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/start`,
      credenciales,
      { withCredentials: true }
    );
  }

  registro(datosUsuario: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/users`,
      datosUsuario,
      { withCredentials: true }
    );
  }

  cambiarRolUsuario(id: string, datosActualizados: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/user/edit/${id}`,
      datosActualizados,
      { headers: this.getHeaders() }
    );
  }

  obtenerCartasPorTipo(type: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/cards/${type}`,
      { withCredentials: true }
    );
  }

  eliminarCarta(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/cards/${id}`,
      this.getOptions()
    );
  }

  banearUsuario(id: string, banData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/admin/ban/${id}`,
      banData,
      { headers: this.getHeaders() }
    );
  }

  cerrarSesion(): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/close`,
      {},
      { withCredentials: true }
    );
  }
}