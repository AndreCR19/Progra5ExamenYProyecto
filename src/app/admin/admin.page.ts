import { Component, OnInit } from '@angular/core';
import { Habitacion } from '../app.model';
import { Reservacion } from '../app.model';
import { PrincipalService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  habitaciones: Habitacion[];
  reser: Reservacion[];
  constructor(private principalServicio: PrincipalService) {}

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
