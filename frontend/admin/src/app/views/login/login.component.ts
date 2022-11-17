import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  passwordHide: Boolean = true;

  constructor(private fb: FormBuilder) {
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
    }
  }
}
