import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from './app.model';
import { Reservacion } from './app.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private habitaciones: Habitacion[] = [];
  private reservaciones: Reservacion[] = [
    {
      id: '1000001',
      idHabitacion: 'habi1001',
      dateStart: '15-08-2021',
      dateFinish: '19-08-2021'
    }
  ];
  constructor(
    private httpClient: HttpClient
  ) {
    this.httpClient.get<{ [key: string]: Habitacion}>('https://progra5eyp-default-rtdb.firebaseio.com/rooms.json')
    .subscribe(
      restData => {
        const habitaciones = [];
        for ( const key in restData) {
          if(restData.hasOwnProperty(key)) {
            habitaciones.push(new Habitacion(
              key,
              restData[key].title,
              restData[key].descrip,
              restData[key].price,
              restData[key].status,
              restData[key].perRoom
            ));
          }
        }
        this.habitaciones = habitaciones;
      }
    );
  }
  getAll(){
    return [...this.habitaciones];
  }
  getHabitacion(habiID: string){
    return {...this.habitaciones.find(
      habitacion => habiID === habitacion.id
    )};
  }


  addHabitacion(id: string, title: string, descrip: string, price: number, status: boolean, perRoom: number){
    const newHabi = new Habitacion(
      id,
      title,
      descrip,
      price,
      status,
      perRoom
    );
    this.httpClient.post<{name: string}>('https://progra5eyp-default-rtdb.firebaseio.com/rooms.json',
    {
      ...newHabi,
      id: null
    })
    .subscribe(
      (restData) => {
        newHabi.id = restData.name;
      },
    );

    this.habitaciones.push(newHabi);
    console.log(this.habitaciones);
  }


  editHabitacion(id: string, title: string, descrip: string, price: number, status: boolean, perRoom: number){
    const alteredHabi = new Habitacion(
      id,
      title,
      descrip,
      price,
      status,
      perRoom
    );
    this.httpClient.put<{name: string}>
    (`https://progra5eyp-default-rtdb.firebaseio.com/rooms/${id}.json`,
    {
      ...alteredHabi,
      id: null
    })
    .subscribe(
      (restData) => {
        alteredHabi.id = restData.name;
      },
    );
  }
}
