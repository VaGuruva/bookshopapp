import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_LOGIN } from '../../mutations';
import { Apollo } from "apollo-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private apollo: Apollo, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.userLoginForm = this.formBuilder.group({
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
    console.log(this.userLoginForm.status=='INVALID')
    if(this.userLoginForm.status=='INVALID') return;

    this.apollo.mutate({
      mutation: USER_LOGIN,
      variables: {
        email: this.userLoginForm.get('email').value,
        password: this.userLoginForm.get('password').value
      }
    }).subscribe(({ data }) => {
      if(data){
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/']);
      }
    },(error) => {
      console.log('Error occured on user login. Please try again later', error);
    });
  }

}
