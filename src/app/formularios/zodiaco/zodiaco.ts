
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface IAzodiaco {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  anio: number;
  sexo: string;
}

@Component({
  imports: [FormsModule, ReactiveFormsModule],
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
    sexo: ''
  };

  edad: number = 0;
  signo: string = '';
  emoji: string = '';
  color: string = '';

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

    let anioActual = 2026;

    this.edad = anioActual - this.alumno.anio;

    let signos = [
      'Rata',
      'Buey',
      'Tigre',
      'Conejo',
      'Dragón',
      'Serpiente',
      'Caballo',
      'Cabra',
      'Mono',
      'Gallo',
      'Perro',
      'Cerdo'
    ];

    let emojis = [
      '🐀',
      '🐂',
      '🐅',
      '🐇',
      '🐉',
      '🐍',
      '🐎',
      '🐐',
      '🐒',
      '🐓',
      '🐕',
      '🐖'
    ];

    let colores = [
      '#F87171',
      '#A78BFA',
      '#FB923C',
      '#F9A8D4',
      '#34D399',
      '#60A5FA',
      '#FBBF24',
      '#C084FC',
      '#2DD4BF',
      '#F472B6',
      '#818CF8',
      '#A3A3A3'
    ];

    let resultado = ((this.alumno.anio - 4) % 12 + 12) % 12;

    this.signo = signos[resultado];
    this.emoji = emojis[resultado];
    this.color = colores[resultado];
  }

}
