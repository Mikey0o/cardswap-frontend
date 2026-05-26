import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/v1';

  private getOptions() {
    return {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  constructor() { }
  //constructor(private http: HttpClient) { }

  private getHeaders(){
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  }

  login(credenciales: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/auth/session/start`, credenciales, { withCredentials: true });
  //                                   ↑ agregar /auth/
}

  registro(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, datosUsuario, { withCredentials: true });
  }

  // 3. Editar usuario / Cambiar de Rol (PUT /user/edit/:id)
  cambiarRolUsuario(id: string, datosActualizados: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/user/edit/${id}`, datosActualizados, { headers: this.getHeaders() });
  }

  // 4. Listar todas las cartas globales según su tipo (GET /card/:type)
  obtenerCartasPorTipo(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cards/${type}`, { withCredentials: true });
  }

  // 5. Eliminar publicación / carta (DELETE /card/:id)
  eliminarCarta(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cards/${id}`, this.getOptions());
  }

  // 6. Banear usuario
  banearUsuario(id: string, banData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/ban/${id}`, banData, { headers: this.getHeaders() });

  }
  // 7. Cerrar sesion
  cerrarSesion(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/session/close`, {}, { withCredentials: true });
  }

  //8. metodo para listar usuarios - Administrador
  obtenerUsuarios(): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/users`, { headers: this.getHeaders() });
}

  // Método para registrar usuarios nuevos
  /*registro(datosUsuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, datosUsuario);
  }*/

}