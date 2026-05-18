import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/session/start'; //revisar el puerto sea el mismo del back - Node

  constructor(private http: HttpClient){}

  //Envio de correo y contraseña al back
  login(crendenciales:any): Observable<any>{
    return this.http.post(this.apiUrl, crendenciales);
  }
}
