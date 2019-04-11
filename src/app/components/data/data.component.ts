import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


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
    pasatiempos: 'Comer',
    password1: '',
    password2: ''
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre : new FormControl('', [Validators.required, Validators.minLength(3)]),
        apellido : new FormControl('', [Validators.required, Validators.minLength(3)])
      }),
      correo : new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      pasatiempos: new FormArray([
        new FormControl('Comer', [Validators.required, Validators.minLength(3)])
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [])
    });
    this.forma.controls.password2.setValidators([
      Validators.required,
      this.noIguales.bind( this.forma )
    ]);
    //  this.forma.setValue(this.Usuario);

    this.forma.controls.username.valueChanges.subscribe( data => console.log(data));
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

  noIguales( control: FormControl): { [s: string]: boolean } {
    const forma: any = this;
    if (control.value !== forma.controls.password1.value) {
      return {
        noIguales: true
      };
    }

    return null;

   }

   existeUsuario(control: FormControl): Promise<any> | Observable<any> {

    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout( () => {
          if ( control.value === 'GatroxM') {
            resolve( { existe: true } );
          } else {
            resolve( null );
          }
        }, 3000 );
      }
    );

    return promesa;

   }

}
