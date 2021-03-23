import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.userLoginForm = this.formBuilder.group({
      email: ["", {
        validators: [
          Validators.required
        ]
      }],
      password: ["", {
        validators: [
          Validators.required
        ]
      }]
    });
  }

}
