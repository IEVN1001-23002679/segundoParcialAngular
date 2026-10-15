
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAzodiaco } from '../zodiaco/azodiaco';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-editar-zodiaco',
  templateUrl: './editar-zodiaco.html',
  styleUrl: './editar-zodiaco.css'
})
export class EditarZodiaco implements OnInit {

  formulario!: FormGroup;
  indice: number = -1;

  signos: string[] = [
    'Rata', 'Buey', 'Tigre', 'Conejo',
    'Dragón', 'Serpiente', 'Caballo', 'Cabra',
    'Mono', 'Gallo', 'Perro', 'Cerdo'
  ];

  constructor(
    private ruta: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apaterno: new FormControl(''),
      amaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl(''),
      edad: new FormControl(''),
      signo: new FormControl('')
    });

    this.indice = Number(this.ruta.snapshot.paramMap.get('id'));

    let datos = localStorage.getItem('registrosZodiaco');
    let registros: IAzodiaco[] = datos ? JSON.parse(datos) : [];

    if (
      datos === null ||
      !Number.isInteger(this.indice) ||
      this.indice < 0 ||
      this.indice >= registros.length
    ) {
      alert('No se encontró el registro.');
      this.regresar();
      return;
    }

    let registro = registros[this.indice];

    this.formulario.patchValue({
      nombre: registro.nombre,
      apaterno: registro.apaterno,
      amaterno: registro.amaterno,
      dia: registro.dia,
      mes: registro.mes,
      anio: registro.anio,
      sexo: registro.sexo,
      edad: registro.edad,
      signo: registro.signo
    });
  }

  guardarCambios(): void {

    let datos = localStorage.getItem('registrosZodiaco');
    let registros: IAzodiaco[] = datos ? JSON.parse(datos) : [];

    if (this.indice < 0 || this.indice >= registros.length) {
      alert('No se encontró el registro.');
      this.regresar();
      return;
    }

    let formulario = this.formulario.value;

  if (
    formulario.nombre === '' ||
    formulario.apaterno === '' ||
    formulario.amaterno === '' ||
    formulario.sexo === '' ||
    formulario.signo === '' ||
    formulario.edad === '' ||
    Number(formulario.edad) < 0 ||
    Number(formulario.edad) > 130 ||
    Number(formulario.edad) % 1 !== 0
  ) {
    alert('No estas completando correctamente los campos.');
    return;
  }

    let dia = Number(formulario.dia);
    let mes = Number(formulario.mes);
    let anio = Number(formulario.anio);

    let fecha = new Date(anio, mes - 1, dia);

    if (
      dia < 1 || mes < 1 || mes > 12 || anio < 1900 ||
      fecha.getFullYear() !== anio ||
      fecha.getMonth() !== mes - 1 ||
      fecha.getDate() !== dia ||
      fecha > new Date()
    ) {
      alert('Ingresa una fecha de nacimiento válida.');
      return;
    }

    registros[this.indice] = {
      nombre: formulario.nombre.trim(),
      apaterno: formulario.apaterno.trim(),
      amaterno: formulario.amaterno.trim(),
      dia: dia,
      mes: mes,
      anio: anio,
      sexo: formulario.sexo,
      edad: Number(formulario.edad),
      signo: formulario.signo
    };

    localStorage.setItem(
      'registrosZodiaco',
      JSON.stringify(registros)
    );

    alert('Registro actualizado correctamente.');

    this.regresar();
  }

  regresar(): void {
    this.router.navigate(['/formularios/registros-zodiaco']);
  }
}
