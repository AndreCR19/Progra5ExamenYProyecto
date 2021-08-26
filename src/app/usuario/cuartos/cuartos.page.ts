import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';

@Component({
  selector: 'app-cuartos',
  templateUrl: './cuartos.page.html',
  styleUrls: ['./cuartos.page.scss'],
})
export class CuartosPage implements OnInit {
  habitaciones: Habitacion[];
  reser: Reservacion[];
  constructor(
    private principalServicio: PrincipalService,
    ) {}

  ngOnInit() {
  }
  ionViewWillEnter(){
    console.log('Entro al will enter');
    console.log('Entro al will enter');
    setTimeout(() => {
      this.habitaciones = this.principalServicio.getAll();
    }, 250);
  }
}
