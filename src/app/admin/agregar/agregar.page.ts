import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PrincipalService } from 'src/app/app.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  formEjemplo = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    descrip: new FormControl(''),
    price: new FormControl(''),
    status: new FormControl(''),
    perRoom: new FormControl(''),
  });

  constructor(
    private productService: PrincipalService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  addFunction(){
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
