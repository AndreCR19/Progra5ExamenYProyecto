import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Habitacion, Reservacion, User } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  habitacion: Habitacion;
  usuario: User[];
  reservas: Reservacion[];
  formReserva: FormGroup;
  submitted = false;
 /*  active = '';

  nav = [
    {
      name: 'Homepage',
      link: '/usuario',
      icon: 'person-circle'
    },
    {
      name: 'Habitaciones',
      link: '/usuario/cuartos',
      icon: 'albums'
    },
    {
      name: 'Perfil',
      link: '/usuario/perfil',
      icon: 'call'
    }
  ]; */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private principalServicio: PrincipalService,
    public formBuilder: FormBuilder,
    public afs: AngularFirestore
    ) {
    /* this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    }); */
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if(!paramMap.has('habiID')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habiID');
        this.habitacion = this.principalServicio.getHabitacion(habitacionId);
        this.usuario = this.principalServicio.getLoggedUser();
      }
    );

    this.formReserva = this.formBuilder.group({
      id: [''],
      idHabitacion: [this.habitacion.id, [Validators.required]],
      idUser: [this.usuario[0].id, [Validators.required]],
      dateStart: ['', [Validators.required]],
      dateFinish: ['', [Validators.required]],
    });



  }
  addReser(){
    console.log('entro al addReser');
    console.log(this.formReserva);
    this.submitted = true;
    if(!this.formReserva.valid){
      return;
    }
    console.log(this.formReserva);
    this.principalServicio.addReserva(
      this.formReserva.value.id,
      this.formReserva.value.idHabitacion,
      this.formReserva.value.idUser,
      this.formReserva.value.dateStart,
      this.formReserva.value.dateFinish,
    );
    this.router.navigate(['/usuario/perfil']);
  }

}
