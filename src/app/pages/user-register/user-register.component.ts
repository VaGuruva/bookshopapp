import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CREATE_USER } from '../../mutations';
import { Apollo } from "apollo-angular";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  userRegisterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private apollo: Apollo, 
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.userRegisterForm = this.formBuilder.group({
      name: ["", {
        validators: [
          Validators.required
        ]
      }],
      email: ["", {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],
      password: ["", {
        validators: [
          Validators.required
        ]
      }]
    });
  }

  submit(){
    if(this.userRegisterForm.status=='INVALID') return;

    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.userRegisterForm.get('name').value,
        email: this.userRegisterForm.get('email').value,
        password: this.userRegisterForm.get('password').value
      }
    }).subscribe(({ data }) => {
      if(data){
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/']);
      }
    },(error) => {
      this.snackBar.open(`${error}, Please Try Again`, null, {
        duration: 2000,
      });
    });
  }

}
