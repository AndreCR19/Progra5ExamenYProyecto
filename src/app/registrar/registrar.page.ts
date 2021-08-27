import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrincipalService } from '../app.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  formRegistro: FormGroup;
  submitted = false;
  constructor(
    private productService: PrincipalService,
    private router: Router,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.formRegistro = this.formBuilder.group({
      id: [''],
      fname: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(3)]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['0']
    });
  }
  addFunction(){
    this.submitted = true;
    if(!this.formRegistro.valid){
      return;
    }
    console.log(this.formRegistro);
    this.productService.addUser(
      this.formRegistro.value.id,
      this.formRegistro.value.fname,
      this.formRegistro.value.lastName,
      this.formRegistro.value.email,
      this.formRegistro.value.pass,
      this.formRegistro.value.rol
    );
    this.router.navigate(['/login']);
  }

}
