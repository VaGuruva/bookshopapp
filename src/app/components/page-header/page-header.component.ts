import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth'

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.loggedIn = (user && user.token)? true : false;
    })
  }

  clearUser(): void{
    this.authService.exitUser();
  }
}
