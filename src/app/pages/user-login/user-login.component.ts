import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { USER_LOGIN } from '../../mutations';
import { Apollo } from "apollo-angular";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth';

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
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
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
    if(this.userLoginForm.status=='INVALID') return;

    this.apollo.mutate({
      mutation: USER_LOGIN,
      variables: {
        email: this.userLoginForm.get('email').value,
        password: this.userLoginForm.get('password').value
      }
    }).subscribe(({ data }) => {
      if(data){
        const user = JSON.parse(JSON.stringify(data));
        localStorage.setItem('user', JSON.stringify(user.login));
        this.authService.user.next(user.login)
        this.router.navigate(['/']);
      }
    },(error) => {
      this.snackBar.open(`Error occured, Please Try Again`, null, {
        duration: 2000,
      });
    });
  }

}
