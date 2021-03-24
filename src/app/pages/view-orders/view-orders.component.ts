import { Component, OnInit } from '@angular/core';
import { GET_ORDERS_BY_USER } from '../../queries';
import { Apollo } from "apollo-angular";
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth'

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  displayedColumns: string[] = ['title', 'quantity', 'total'];
  dataSource: any[] = [];
  ordersSubscription: Subscription;

  constructor(private apollo: Apollo, private authService: AuthService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void{
    const user = this.authService.getUser();
    this.ordersSubscription = this.apollo
      .query<any>({
        query: GET_ORDERS_BY_USER,
        variables: {
          email: user.email
        }
      })
      .subscribe(
        ({ data }) => {
          this.dataSource = data.orderByUser
        }
    );
  }
}
