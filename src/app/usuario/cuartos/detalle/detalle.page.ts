import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { Habitacion } from 'src/app/app.model';
import { PrincipalService } from 'src/app/app.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  habitacion: Habitacion;
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
    private principalServicio: PrincipalService
    ) {
    /* this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    }); */
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('habiID')){
          // No existe el parametro redirecciono
          return;
        }
        const habitacionId = paramMap.get('habiID');
        this.habitacion = this.principalServicio.getHabitacion(habitacionId);
      }
    );
  }


}
