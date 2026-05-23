import { Component } from '@angular/core';
import {Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent{
  credenciales = {
    email: '',
    password: ''
  };

  errorMensaje: String = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    this.errorMensaje = '';

    this.authService.login(this.credenciales).subscribe({
      next: (respuesta) => {
        console.log('Exito', respuesta);

        localStorage.setItem('userRole', respuesta.role);
        this.router.navigate(['/inicio']);
      }
    });
  }
}
