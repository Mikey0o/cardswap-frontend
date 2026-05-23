import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent implements OnInit{
  userRole: string | null = '';
  constructor(private router: Router){}
  
  ngOnInit(){
    this.userRole = localStorage.getItem('userRole'); //verifica el rol que inicio sesion

    if (!this.userRole){
      this.router.navigate(['/login']);
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
