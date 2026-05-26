import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css'],
})
export class InicioComponent implements OnInit {
  userRole: string | null = '';
  userName: string = '';
  idAdminActual: string = '664f12345678901234567890'; // Simulación del ID del admin logueado
  tabActiva: string = 'cartas';

  // Listados del sistema
  cartas: any[] = [];
  cartasFiltradas: any[] = [];

  //usuarios: any[]=[];
  //listaBaneados: any[]=[];

    //Datos simulados de usuarios
  usuarios: any[] = [
    { _id: '1', nombre: 'Maluma Perez', mail: 'maluma@mail.com', role: 'usuario', edad: 21 },
    { _id: '2', nombre: 'Luffy Monkey', mail: 'luffy@mail.com', role: 'moderador', edad: 18 },
    { _id: '3', nombre: 'Zoro Gómez', mail: 'zoro@mail.com', role: 'usuario', edad: 34 }
  ];

  //un usuario ya banneado para pruebas.
  listaBaneados: any[] = [
    { idUser: '4', nombreBaneado: 'Stalin lósif', reason: 'Intento de estafa con cartas falsas', fecha: '2026-05-20' }
  ];
  
  // Variables para filtros de cartas
  filtroNombre: string = '';
  filtroRareza: string = '';
  filtroEdicion: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const roleRaw = localStorage.getItem('userRole');
    const nombreRaw = localStorage.getItem('userName');
    this.userRole = roleRaw ? roleRaw.toLowerCase() : null;
    this.userName = nombreRaw || 'Usuario';

    if (!this.userRole) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargamos las cartas globales
    this.cargarCartasGlobales();

    //Unicamente carga los usuarios si el rol es administrador
    if(this.userRole === 'admin'){
      this.cargarUsuarios();
    }
  }

  cargarCartasGlobales() {
    // Consumimos el endpoint GET /card/:type usando 'oferta' como tipo por defecto
    this.authService.obtenerCartasPorTipo('oferta').subscribe({
      next: (data) => {
        console.log('Cartas cargadas con éxito:', data);
        this.cartas = data;
        this.cartasFiltradas = data;
      },
      error: (err) => {
        // Si el estado es 404, significa que simplemente no hay cartas registradas
        if (err.status === 404) {
          console.warn('La base de datos está vacía para el tipo solicitado.');
          
          this.cartas = [
            { _id: 'c1', edition: 'Primera Edición', language: 'Español', status: 'disponible', idTrader: '1', nombreSimulado: 'Dragón Blanco' },
            { _id: 'c2', edition: 'Limitada', language: 'Inglés', status: 'disponible', idTrader: '2', nombreSimulado: 'Mago Oscuro' }
          ];
          this.cartasFiltradas = this.cartas;
        } else {
          console.error('Error al cargar cartas del servidor:', err);
        }
      }
    });
  }

  //Metodo para obtener usuarios reales desde la API
  cargarUsuarios() {
  this.authService.obtenerUsuarios().subscribe({
    next: (data) => {
      // Combina datos reales + simulados
      const simulados = [
        { _id: '1', nombre: 'Maluma Perez', mail: 'maluma@mail.com', role: 'usuario', edad: 21 },
        { _id: '2', nombre: 'Luffy Monkey', mail: 'luffy@mail.com', role: 'moderador', edad: 18 },
        { _id: '3', nombre: 'Zoro Gómez', mail: 'zoro@mail.com', role: 'usuario', edad: 34 }
      ];
      this.usuarios = [...data, ...simulados];
    },
    error: (err) => {
      console.error('Error al cargar usuarios:', err);
      // Si falla el backend, muestra solo simulados
      this.usuarios = [
        { _id: '1', nombre: 'Maluma Perez', mail: 'maluma@mail.com', role: 'usuario', edad: 21 },
        { _id: '2', nombre: 'Luffy Monkey', mail: 'luffy@mail.com', role: 'moderador', edad: 18 },
        { _id: '3', nombre: 'Zoro Gómez', mail: 'zoro@mail.com', role: 'usuario', edad: 34 }
      ];
    }
  });
}

  // 1. Filtrar cartas por nombre, rareza o edición
  aplicarFiltros() {
    this.cartasFiltradas = this.cartas.filter(carta => {
      const cumpleNombre = !this.filtroNombre || (carta.nombreSimulado || '').toLowerCase().includes(this.filtroNombre.toLowerCase());
      const cumpleEdicion = !this.filtroEdicion || carta.edition.toLowerCase().includes(this.filtroEdicion.toLowerCase());
      const cumpleStatus = !this.filtroRareza || carta.status.toLowerCase().includes(this.filtroRareza.toLowerCase());
      return cumpleNombre && cumpleEdicion && cumpleStatus;
    });
  }

  // 2. Cambiar de Rol a un usuario
  cambiarRol(usuario: any, nuevoRol: string) {
  if (!nuevoRol) return;

  const datosActualizados = {
    nombre: usuario.nombre,
    edad: usuario.edad,
    mail: usuario.mail,
    role: nuevoRol
  };

  this.authService.cambiarRolUsuario(usuario._id, datosActualizados).subscribe({
    next: (res) => {
      usuario.role = nuevoRol;
      alert(`Rol de ${usuario.nombre} actualizado a ${nuevoRol}`);
    },
    error: (err) => {
      usuario.role = nuevoRol;
      alert(`Rol de ${usuario.nombre} actualizado a ${nuevoRol}`);
    }
  });
}

  // 3. Eliminar publicación
  eliminarPublicacion(idCarta: string) {
    if (confirm('¿Seguro que deseas eliminar esta publicación?')) {
      this.authService.eliminarCarta(idCarta).subscribe({
        next: (res) => {
          this.cartas = this.cartas.filter(c => c._id !== idCarta);
          this.aplicarFiltros();
          alert('Publicación eliminada correctamente.');
        },
        error: (err) => console.error('Error al eliminar carta:', err)
      });
    }
  }

  // 4. Registrar baneo
  ejecutarBaneo(usuario: any) {
  const razon = prompt(`Introduzca la razón del baneo para ${usuario.nombre}:`);
  if (!razon) return;

  const banData = { reason: razon, idAdmin: this.idAdminActual };

  const nuevoBan = {
    idUser: usuario._id,
    nombreBaneado: usuario.nombre,
    reason: razon,
    fecha: new Date().toISOString().split('T')[0]
  };

  this.authService.banearUsuario(usuario._id, banData).subscribe({
    next: () => {
      this.listaBaneados.push(nuevoBan);
      this.usuarios = this.usuarios.filter(u => u._id !== usuario._id);
      alert(`Usuario ${usuario.nombre} baneado con éxito.`);
    },
    error: () => {
      // Simulado: aplicar igual localmente
      this.listaBaneados.push(nuevoBan);
      this.usuarios = this.usuarios.filter(u => u._id !== usuario._id);
      alert(`Usuario ${usuario.nombre} baneado.`);
    }
  });
}

  //cerrar sesión
  logout() {
  this.authService.cerrarSesion().subscribe({
    next: () => {
      localStorage.clear();
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Error al cerrar sesión', err);
      localStorage.clear();
      this.router.navigate(['/login']);
      }
    });
  }

  desbanearUsuario(ban: any) {
  if (!confirm(`¿Desea quitar el ban a ${ban.nombreBaneado}?`)) return;
  this.listaBaneados = this.listaBaneados.filter(b => b.idUser !== ban.idUser);
  alert(`${ban.nombreBaneado} ha sido desbaneado.`);
}
}