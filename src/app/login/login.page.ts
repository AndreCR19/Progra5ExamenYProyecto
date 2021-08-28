import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../app.model';
import { PrincipalService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarios: User[];
  usuarioCorrecto: User;
  loginForm: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private principalServicio: PrincipalService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.loginForm =this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      pass: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ionViewWillEnter(){
    console.log('Entro al will enter');
    setTimeout(() => {
      this.usuarios = this.principalServicio.getAllUser();
    }, 250);
  }

  async loginAttempt(){
    console.log('Entro a la funcion');
    this.submitted = true;
    if (!this.loginForm.valid) {
      console.log('All fields are required.');
      return false;
    };
    this.usuarioCorrecto = this.principalServicio.getUser(
      this.loginForm.value.email
    );
    if( this.loginForm.value.pass === this.usuarioCorrecto.pass) {
      console.log('login exitoso');
      this.principalServicio.setUser(
        this.usuarioCorrecto.id,
        this.usuarioCorrecto.fname,
        this.usuarioCorrecto.lastName,
        this.usuarioCorrecto.email,
        this.usuarioCorrecto.pass,
        this.usuarioCorrecto.rol
      );
      if ( this.usuarioCorrecto.rol === '1' ) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/usuario']);
      }
    }
  }
}
