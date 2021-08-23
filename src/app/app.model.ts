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
