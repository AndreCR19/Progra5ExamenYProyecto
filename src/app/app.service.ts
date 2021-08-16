import { Injectable } from '@angular/core';
import { Habitacion } from './app.model';
import { Reservacion } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private habitaciones: Habitacion[] = [
    {
      id: 'habi1001',
      title: 'Habitacion Queen',
      descrip: 'Una cama, vista al jardin',
      price: 30,
      status: true,
      perRoom: 2
    },
    {
      id: 'habi1002',
      title: 'Habitacion King',
      descrip: 'Una cama, vista al jardin',
      price: 31,
      status: true,
      perRoom: 3
    }
  ];

  private reservaciones: Reservacion[] = [
    {
      id: '1000001',
      idHabitacion: 'habi1001',
      dateStart: '15-08-2021',
      dateFinish: '19-08-2021'
    }
  ];
  constructor() { }
  getAll(){
    return [...this.habitaciones];
  }
  getHabitacion(habiID: string){
    return {...this.habitaciones.find(
      habitacion => habiID === habitacion.id
    )};
  }
}
