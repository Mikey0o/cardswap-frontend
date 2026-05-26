import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  credenciales = {
    mail: '',
    pass: ''
  };
  errorMensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMensaje = '';
    this.authService.login(this.credenciales).subscribe({
      next: (respuesta: any) => {
        console.log('Exito', respuesta);
        if (respuesta.token) {
          localStorage.setItem('token', respuesta.token);
        }
        localStorage.setItem('userRole', respuesta.role);
        localStorage.setItem('userId', respuesta.id);
        localStorage.setItem('userName', respuesta.nombre);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.errorMensaje = 'Correo o contraseña incorrectos';
      }
    });
  }
}