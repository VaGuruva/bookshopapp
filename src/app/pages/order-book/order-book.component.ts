import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router
    // .data
    // .subscribe(v => console.log(v));
  }

}
