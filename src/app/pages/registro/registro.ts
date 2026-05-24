import { Component } from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})

export class RegistroComponent {
  // Ajustamos el objeto a lo que el backend realmente espera
  nuevoUsuario = {
    nombre: '',   // Nuevo campo obligatorio
    edad: 0,      // Nuevo campo obligatorio
    mail: '',     // Cambiado de 'email' a 'mail'
    pass: '',     // Cambiado de 'password' a 'pass'
    role: 'usuario' // Ajustado a los valores permitidos: "admin"|"moderador"|"usuario"
  };

  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    // Convertimos la edad a número por seguridad
    const dataToSend = {
      ...this.nuevoUsuario,
      edad: Number(this.nuevoUsuario.edad) 
    };

    this.authService.registro(dataToSend).subscribe({
      next: (respuesta) => {
        this.exitoMensaje = 'Registro Exitoso, redirigiendo...';
        setTimeout(() => { this.router.navigate(['/login']); }, 2000);
      },
      error: (err) => {
        console.error('Error en el registro: ', err);
        this.errorMensaje = 'Error al registrar: ' + (err.error?.message || 'Revisa los campos');
      }
    });
  }
}