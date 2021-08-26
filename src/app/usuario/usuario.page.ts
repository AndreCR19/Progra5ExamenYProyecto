import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion } from '../app.model';
import { PrincipalService } from '../app.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  habitaciones: Habitacion[];
  reser: Reservacion[];
  constructor(private principalServicio: PrincipalService) { }

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
