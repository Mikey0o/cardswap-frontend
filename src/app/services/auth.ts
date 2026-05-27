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
      `${this.baseUrl}/auth/session/start`,
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
    return this.http.put(`${this.baseUrl}/users/user/edit/${id}`, datosActualizados, { headers: this.getHeaders() });
  }

  obtenerCartasPorTipo(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cards/${type}`, { withCredentials: true });
  }

  eliminarCarta(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cards/${id}`, this.getOptions());
  }

  banearUsuario(id: string, banData: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/admin/ban/${id}`,
      banData,
      { headers: this.getHeaders() }
    );
  }

  cerrarSesion(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/session/close`, {}, { withCredentials: true });
  }

  //8. metodo para listar usuarios - Administrador
  obtenerUsuarios(): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/users`, { headers: this.getHeaders(), withCredentials: true });
}

  // Método para registrar usuarios nuevos
  /*registro(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, datosUsuario);
  }*/

}