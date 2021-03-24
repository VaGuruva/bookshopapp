import { Component, OnInit } from '@angular/core';
import { GET_ORDERS_BY_USER } from '../../queries';
import { Apollo } from "apollo-angular";
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth'
import { DELETE_ORDER } from '../../mutations'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  displayedColumns: string[] = ['title', 'quantity', 'total', 'delete'];
  dataSource: any[] = [];
  ordersSubscription: Subscription;
  deletOrderSubscription: Subscription;

  constructor(
    private apollo: Apollo, 
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
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
          if (data) {
            this.dataSource = data.orderByUser
          }
        }
      );
  }

  deleteOrder(orderToDelete) {
    this.deletOrderSubscription = this.apollo.mutate({
        mutation: DELETE_ORDER,
        variables: {
          number: orderToDelete.number
        }
      }).subscribe(({ data }) => {
        if(data){
          this.dataSource = this.dataSource.filter(order => order.number != orderToDelete.number)
          this.snackBar.open(`Order deleted.`, null, {
            duration: 2000,
          });
        }
      },(error) => {
        this.snackBar.open(`Delete order error, Please Try Again`, null, {
          duration: 2000,
        });
      });
  }

  ngDestroy(): void {
    if (this.ordersSubscription) this.ordersSubscription.unsubscribe();
    if (this.deletOrderSubscription) this.deletOrderSubscription.unsubscribe();
  }
}
