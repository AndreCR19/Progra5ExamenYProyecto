import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion, User } from './app.model';
import { Reservacion } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private habitaciones: Habitacion[] = [];
  private reservaciones: Reservacion[] = [];
  private users: User[] = [];
  private usuarioLogged: User[] = [];


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

    this.httpClient.get<{ [key: string]: Reservacion}>('https://progra5eyp-default-rtdb.firebaseio.com/reservas.json')
    .subscribe(
      restData => {
        const reservaciones = [];
        for ( const key in restData) {
          if(restData.hasOwnProperty(key)) {
            reservaciones.push(new Reservacion(
              key,
              restData[key].idHabitacion,
              restData[key].idUser,
              restData[key].dateStart,
              restData[key].dateFinish
            ));
          }
        }
        this.reservaciones = reservaciones;
      }
    );


    this.httpClient.get<{ [key: string]: User}>('https://progra5eyp-default-rtdb.firebaseio.com/users.json')
    .subscribe(
      restData => {
        const usuarios = [];
        for ( const key in restData) {
          if(restData.hasOwnProperty(key)) {
            usuarios.push(new User(
              key,
              restData[key].fname,
              restData[key].lastName,
              restData[key].email,
              restData[key].pass,
              restData[key].rol
            ));
          }
        }
        this.users = usuarios;
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
    console.log(this.reservaciones);
    return [...this.reservaciones];
  }

  getReserUser(idUser: string){
    return {...this.reservaciones.find(
      reservacion => idUser === reservacion.idUser
    )};
  }

  getAllUser(){
    console.log('entra');
    return [...this.users];
  }

  getUser(email: string){
    return {...this.users.find(
      usuario => email === usuario.email
    )};
  }

  setUser(id: string, fname: string, lastName: string, email: string, pass: string, rol: string){
    const newUser = new User(
      id = id,
      fname = fname,
      lastName = lastName,
      email = email,
      pass = pass,
      rol = rol
    );
    this.usuarioLogged.push(newUser);
    console.log('prueba1234');
    console.log(this.usuarioLogged);
  }

  getLoggedUser(){
    console.log('entra');
    return [...this.usuarioLogged];
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


  addUser(id: string, fname: string, lastName: string, email: string, pass: string, rol: string){
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

    this.users.push(newUser);
    console.log(this.users);
  }

  addReserva(id: string, idHabitacion: string, idUser: string, dateStart: string, dateFinish: string){
    const newReser = new Reservacion(
      id,
      idHabitacion,
      idUser,
      dateStart,
      dateFinish
    );
    this.httpClient.post<{name: string}>('https://progra5eyp-default-rtdb.firebaseio.com/reservas.json',
    {
      ...newReser,
      id: null
    })
    .subscribe(
      (restData) => {
        newReser.id = restData.name;
      },
    );

    this.reservaciones.push(newReser);
    console.log(this.reservaciones);
  }
}
