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

export class RegistroComponent{
  nuevoUsuario = {
    email: '',
    password: '',
    role: 'Trader' //por defecto el usuario se registra como trader, solo el admin puede cambiarlo
  };

  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    this.errorMensaje = '';
    this.exitoMensaje = '';

    this.authService.registro(this.nuevoUsuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario registrado con exito: ', respuesta);
        this.exitoMensaje = 'Registro Exitoso, redirigiendo...';

        setTimeout(()=>{
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err)=>{
        console.log('Error en el registro: ', err);
        this.errorMensaje = 'No se pudo crear la cuenta. Intente de nuevo con otro correo';
      }
    });
  }
}