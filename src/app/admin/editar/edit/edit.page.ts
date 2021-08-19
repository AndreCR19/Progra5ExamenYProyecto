import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private productService: PrincipalService,
  ) { }

  ngOnInit() {
    this.formEdit = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      descrip: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: ['', [Validators.required]],
      perRoom: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });

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
  }
  editFunction(){
    this.submitted = true;
    if(!this.formEdit.valid){
      return;
    }
    console.log(this.formEdit);
    this.productService.editHabitacion(
      this.formEdit.value.id,
      this.formEdit.value.title,
      this.formEdit.value.descrip,
      this.formEdit.value.price,
      this.formEdit.value.status,
      this.formEdit.value.perRoom
    );
    this.router.navigate(['/admin']);
  }

}
