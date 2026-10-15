
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IAzodiaco } from '../zodiaco/azodiaco';

@Component({
  imports: [CommonModule],
  selector: 'app-registros-zodiaco',
  templateUrl: './registros-zodiaco.html',
  styleUrl: './registros-zodiaco.css'
})
export class RegistrosZodiaco implements OnInit {

  registros: IAzodiaco[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    let datos = localStorage.getItem('registrosZodiaco');

    if (datos) {
      this.registros = JSON.parse(datos);
    }
  }

  editarRegistro(index: number): void {
    this.router.navigate(['/formularios/editar-zodiaco', index]);
  }

  eliminarRegistro(index: number): void {
    this.registros.splice(index, 1);

    localStorage.setItem('registrosZodiaco',
      JSON.stringify(this.registros)
    );
  }

  regresar(): void {
    this.router.navigate(['/formularios/zodiaco']);
  }
}
