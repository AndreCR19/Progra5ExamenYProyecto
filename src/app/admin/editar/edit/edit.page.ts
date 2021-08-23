import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  habitacion: Habitacion;
  formEdit: FormGroup;
  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private principalServicio: PrincipalService,
    private router: Router,
    public formBuilder: FormBuilder,
    private productService: PrincipalService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habiID')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habiID');
        this.habitacion = this.principalServicio.getHabitacion(habitacionId);
      }
    );
    this.formEdit = this.formBuilder.group({
      id: [''],
      title: [this.habitacion.title, [Validators.required, Validators.minLength(3)]],
      descrip: [this.habitacion.descrip, [Validators.required, Validators.minLength(3)]],
      price: [this.habitacion.price, [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: [this.habitacion.status, [Validators.required]],
      perRoom: [this.habitacion.perRoom, [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

  }
  editFunction(){
    this.submitted = true;
    if(!this.formEdit.valid){
      return;
    }
    console.log(this.formEdit);
    this.productService.editHabitacion(
      this.habitacion.id,
      this.formEdit.value.title,
      this.formEdit.value.descrip,
      this.formEdit.value.price,
      this.formEdit.value.status,
      this.formEdit.value.perRoom
    );
    this.router.navigate(['/admin']);
  }

}
