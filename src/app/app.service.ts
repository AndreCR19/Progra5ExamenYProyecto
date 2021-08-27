import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion, User } from './app.model';
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
  private user: User[] = [];
  constructor(
    private httpClient: HttpClient,
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

    this.httpClient.get<{ [key: string]: Reservacion}>('https://progra5eyp-default-rtdb.firebaseio.com/reservations.json')
    .subscribe(
      restData => {
        const reservaciones = [];
        for ( const key in restData) {
          if(restData.hasOwnProperty(key)) {
            reservaciones.push(new Reservacion(
              key,
              restData[key].idHabitacion,
              restData[key].dateStart,
              restData[key].dateFinish
            ));
          }
        }
      }
    );


    this.httpClient.get<{ [key: string]: User}>('https://progra5eyp-default-rtdb.firebaseio.com/users.json')
    .subscribe(
      restData => {
        const users = [];
        for ( const key in restData) {
          if(restData.hasOwnProperty(key)) {
            users.push(new User(
              key,
              restData[key].fname,
              restData[key].lastName,
              restData[key].email,
              restData[key].pass,
              restData[key].rol
            ));
          }
        }
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

  getAllReser(){
    return [...this.reservaciones];
  }

  getAllUser(){
    return [...this.user];
  }

  addHabitacion(id: string, title: string, descrip: string, price: number, status: string, perRoom: number){
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

  editHabitacion(id: string, title: string, descrip: string, price: number, status: string, perRoom: number){
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


  addUser(id: string, fname: string, lastName: string, email: string, pass: string, rol: number){
    const newUser = new User(
      id,
      fname,
      lastName,
      email,
      pass,
      rol
    );
    this.httpClient.post<{name: string}>('https://progra5eyp-default-rtdb.firebaseio.com/users.json',
    {
      ...newUser,
      id: null
    })
    .subscribe(
      (restData) => {
        newUser.id = restData.name;
      },
    );

    this.user.push(newUser);
    console.log(this.user);
  }
}
