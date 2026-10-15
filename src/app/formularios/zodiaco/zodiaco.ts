
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAzodiaco } from './azodiaco';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-zodiaco',
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco implements OnInit {

  formulario!: FormGroup;

  alumno: IAzodiaco = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    anio: 0,
    sexo: '',
    edad: 0,
    signo: ''
  };

  edad: number = 0;
  signo: string = '';
  emoji: string = '';
  color: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apaterno: new FormControl(''),
      amaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('')
    });
  }

  imprimir(): void {

    this.alumno.nombre = this.formulario.value.nombre;
    this.alumno.apaterno = this.formulario.value.apaterno;
    this.alumno.amaterno = this.formulario.value.amaterno;
    this.alumno.dia = Number(this.formulario.value.dia);
    this.alumno.mes = Number(this.formulario.value.mes);
    this.alumno.anio = Number(this.formulario.value.anio);
    this.alumno.sexo = this.formulario.value.sexo;

    if (this.alumno.anio < 100) {
      this.alumno.anio = 2000 + this.alumno.anio;
    }

    if (
      this.alumno.nombre === '' ||
      this.alumno.apaterno === '' ||
      this.alumno.amaterno === '' ||
      this.alumno.sexo === '' ||
      this.alumno.dia < 1 ||
      this.alumno.dia > 31 ||
      this.alumno.mes < 1 ||
      this.alumno.mes > 12 ||
      this.alumno.anio < 1900
    ) {
      alert('Llena todos los campooooooooooos.');
      return;
    }

    let fecha = new Date(
      this.alumno.anio,
      this.alumno.mes - 1,
      this.alumno.dia
    );

    if (
      fecha.getFullYear() !== this.alumno.anio ||
      fecha.getMonth() !== this.alumno.mes - 1 ||
      fecha.getDate() !== this.alumno.dia ||
      fecha > new Date()
    ) {
      alert('Ingresa una fecha de nacimiento válida.');
      return;
    }

    let anioActual = new Date().getFullYear();

    this.edad = anioActual - this.alumno.anio;

    let hoy = new Date();

    if (
      hoy.getMonth() < this.alumno.mes - 1 ||
      (hoy.getMonth() === this.alumno.mes - 1 &&
       hoy.getDate() < this.alumno.dia)
    ) {
      this.edad--;
    }

    let signos = [
      'Rata', 'Buey', 'Tigre', 'Conejo',
      'Dragón', 'Serpiente', 'Caballo', 'Cabra',
      'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];

    let emojis = [
      '🐀', '🐂', '🐅', '🐇',
      '🐉', '🐍', '🐎', '🐐',
      '🐒', '🐓', '🐕', '🐖'
    ];

    let colores = [
      '#F87171', '#A78BFA', '#FB923C', '#F9A8D4',
      '#34D399', '#60A5FA', '#FBBF24', '#C084FC',
      '#2DD4BF', '#F472B6', '#818CF8', '#A3A3A3'
    ];

    let resultado = ((this.alumno.anio - 4) % 12 + 12) % 12;

    this.signo = signos[resultado];
    this.emoji = emojis[resultado];
    this.color = colores[resultado];

    this.alumno.edad = this.edad;
    this.alumno.signo = this.signo;

    let registros: IAzodiaco[] = JSON.parse(
      localStorage.getItem('registrosZodiaco') || '[]'
    );

    registros.push({ ...this.alumno });

    localStorage.setItem(
      'registrosZodiaco',
      JSON.stringify(registros)
    );
  }

  verRegistros(): void {
    this.router.navigate(['/formularios/registros-zodiaco']);
  }

  regresar(): void {
    this.formulario.reset();
    this.signo = '';
    this.edad = 0;
  }
}
