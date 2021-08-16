export interface Habitacion {
  id: string;
  title: string;
  descrip: string;
  price: number;
  status: boolean;
  perRoom: number;
}

export interface Reservacion {
  id: string;
  idHabitacion: string;
  dateStart: string;
  dateFinish: string;
}
