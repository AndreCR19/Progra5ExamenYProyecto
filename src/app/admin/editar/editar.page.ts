import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Habitacion } from 'src/app/app.model';
import { Reservacion } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  habitacion: Habitacion;
  constructor(
    private activatedRoute: ActivatedRoute,
    private principalServicio: PrincipalService,
    private router: Router,
    private alertCtrl: AlertController
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
  }

}
