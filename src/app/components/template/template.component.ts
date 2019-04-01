import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  public usuario: object = {
    nombre: 'Gustavo',
    apellido: 'Muñoz',
    correo: 'tavoxpau@gmail.com'
  };
  constructor() { }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log('Forma: ' , forma);
    console.log('Valor: ' , forma.value);
    // console.log('Usuario: ' , this.usuario);
  }
}
