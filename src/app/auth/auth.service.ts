import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      return !this.jwtHelper.isTokenExpired(user.token);
    }
    return false;
  }

  getUser(): any{
    return JSON.parse(localStorage.getItem('user'));
  }
}
