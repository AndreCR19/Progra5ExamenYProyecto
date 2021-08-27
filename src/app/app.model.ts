export interface Habitacion {
  id: string;
  title: string;
  descrip: string;
  price: number;
  status: string;
  perRoom: number;
}
export class Habitacion {
  constructor(
    public id: string,
    public title: string,
    public descrip: string,
    public price: number,
    public status: string,
    public perRoom: number
  ){}
}
export interface Reservacion {
  id: string;
  idHabitacion: string;
  dateStart: string;
  dateFinish: string;
}
export class Reservacion {
  constructor(
    public id: string,
    public idHabitacion: string,
    public dateStart: string,
    public dateFinish: string
  ){}
}

export interface User {
  id: string;
  fname: string;
  lastName: string;
  email: string;
  pass: string;
  rol: number;
}

export class User {
  constructor(
    public id: string,
    public fname: string,
    public lastName: string,
    public email: string,
    public pass: string,
    public rol: number
  ){}
}
