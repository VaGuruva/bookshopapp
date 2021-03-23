import { Component, OnInit } from '@angular/core';
import { GET_ORDERS_BY_USER } from '../../queries';
import { Apollo } from "apollo-angular";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  displayedColumns: string[] = ['title', 'quantity', 'total'];
  dataSource: any[] = [];
  ordersSubscription: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void{
    this.ordersSubscription = this.apollo
      .query<any>({
        query: GET_ORDERS_BY_USER,
        variables: {
          email: "email.com",//To user logged in user details
        }
      })
      .subscribe(
        ({ data }) => {
          this.dataSource = data.orderByUser
        }
    );
  }
}
