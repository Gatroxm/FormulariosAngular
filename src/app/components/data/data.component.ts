import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: [`
  .invalid-feedback{display:block}
  .ng-invalid{border-color:red;}
  .ng-valid{border-color:green;}
  `]
})
export class DataComponent {

  forma: FormGroup;
  Usuario: object = {
    nombreCompleto: {
      nombre: 'gustavo adolfo',
      apellido: 'muñoz reyes'
    },
    correo: 'tavoxpau@gmail.com',
    // pasatiempos: ['Comer', 'Dormir', 'Ver TV']
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre : new FormControl('', [Validators.required, Validators.minLength(3)]),
        apellido : new FormControl('', [Validators.required, Validators.minLength(3), this.nomunoz])
      }),
      correo : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      pasatiempos: new FormArray([
        new FormControl('Comer', [Validators.required, Validators.minLength(3)])
      ]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8), this.noIguales])
    });

    // this.forma.setValue( this.Usuario );
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    // this.forma.reset({
    //   nombreCompleto: {
    //     nombre: '',
    //     apellido: ''
    //   },
    //   correo: ''
    // });
  }
  agregarPasatiempo() {
    (this.forma.controls.pasatiempos as FormArray).push(
      new FormControl('', [Validators.required, Validators.minLength(3)])
    );
  }
  nomunoz( control: FormControl): { [s: string]: boolean } {

    if (control.value === 'muñoz') {
      return {
        nomunoz: true
      };
    }

    return null;

  }

  noIguales( control: FormControl): { [s: string]: boolean } {

    if (control.value !== this.forma.controls.password1.value) {
      return {
        noIguales: true
      };
    }

    return null;

  }

}
