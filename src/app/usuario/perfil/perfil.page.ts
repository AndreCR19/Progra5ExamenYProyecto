import { Component, OnInit } from '@angular/core';
import { Habitacion, Reservacion, User } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: User[];
  habitaciones: Habitacion[];
  reser: Reservacion[];

  constructor(private principalServicio: PrincipalService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    console.log('Entro al will enter');
    setTimeout(() => {
      this.habitaciones = this.principalServicio.getAll();
      this.usuario = this.principalServicio.getLoggedUser();
      this.reser = this.principalServicio.getAllReser();
      console.log(this.reser);
    }, 550);
  }
}
