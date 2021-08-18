import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm =this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      pass: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      console.log('All fields are required.');
      return false;
    } else {
      console.log(this.loginForm.value);
    }
  }
}
