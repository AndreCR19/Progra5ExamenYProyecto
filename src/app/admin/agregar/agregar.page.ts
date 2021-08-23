import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/app.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  formEjemplo: FormGroup;
  submitted = false;

  constructor(
    private productService: PrincipalService,
    private router: Router,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.formEjemplo = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      descrip: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['', [Validators.required]],
      perRoom: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  addFunction(){
    this.submitted = true;
    if(!this.formEjemplo.valid){
      return;
    }
    console.log(this.formEjemplo);
    this.productService.addHabitacion(
      this.formEjemplo.value.id,
      this.formEjemplo.value.title,
      this.formEjemplo.value.descrip,
      this.formEjemplo.value.price,
      this.formEjemplo.value.status,
      this.formEjemplo.value.perRoom
    );
    this.router.navigate(['/admin']);
  }
}
