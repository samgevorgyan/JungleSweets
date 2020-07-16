import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'jungle-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm = this.fb.group({
    emailForm: ['', Validators.required],
    passwordForm: [''],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  logIn() {}
}
