import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  passwordHide: Boolean = true;

  constructor(private fb: FormBuilder,
    private authService: AuthService) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  login() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.authService.login({
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value
      }).subscribe(res => {
        console.log(res);
      })
    }
  }
}
