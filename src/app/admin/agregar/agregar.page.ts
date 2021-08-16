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
  formExample: FormGroup;
  constructor(
    private productService: PrincipalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formExample = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      descrip: new FormControl(null, {
        updateOn: 'blur',
        validators:[
          Validators.required,
          Validators.maxLength(180)
        ]
      }),
      id: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      status: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      }),
      perRoom: new FormControl(null, {
        updateOn: 'blur',
        validators:[Validators.required]
      })
    });
  }
  addFunction(){
    if(!this.formExample.valid){
      return;
    }
    console.log(this.formExample);
    this.productService.addHabitacion(
      this.formExample.value.id,
      this.formExample.value.title,
      this.formExample.value.descrip,
      this.formExample.value.price,
      this.formExample.value.status,
      this.formExample.value.perRoom
    );
    this.router.navigate(['/admin']);
  }
}
