import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStore } from '../../services';
import { Book, Order } from 'src/app/models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BuyBookComponent } from 'src/app/components/buy-book/buy-book.component';
import { CREATE_ORDER } from '../../mutations';
import { Apollo } from "apollo-angular";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStore,
    public dialog: MatDialog,
    private apollo: Apollo,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  book: Book;
  selectedBook: Book;
  imgUrl: string
  routeSubscription: Subscription;
  bookServiceSubscription: Subscription;
  user: any;

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getRouteParams();
  }

  getRouteParams(): void{
    this.selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      if(params){
        this.getBookDetails(params.isbn)
      }
    });
  }

  getBookDetails(isbn: string): void{
    if(this.selectedBook && this.selectedBook.isbn == isbn){
      this.book = this.selectedBook;
      this.imgUrl = this.imgUrl = this.setImgUrl(this.selectedBook.isbn);
      return;
    }
    this.bookServiceSubscription = this.bookStoreService.state$.subscribe(data => {
      if(data){
        this.book = data.books.find(book => book.isbn == isbn);

        localStorage.setItem('selectedBook', JSON.stringify(this.book));
        this.imgUrl = this.setImgUrl(this.book.isbn);
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(BuyBookComponent, 
      {
        data: { isbn: this.book.isbn, price: this.book.price }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        this.orderBook(JSON.parse(result));
      }
      
    });
  }

  setImgUrl(isbn: string): string{
    return `http://ec2-3-17-150-219.us-east-2.compute.amazonaws.com:3000/books/${isbn}.jpeg`
  }

  orderBook(orderInfo: Order) {
    if(!this.user){
      this.snackBar.open('Please login or create account to order books.', null, {
        duration: 3000,
      });
    }
    this.apollo.mutate({
      mutation: CREATE_ORDER,
      variables: orderInfo,
      context: { 
        headers: { 
          "Authorization": `Bearer ${this.user.token}`
        } 
      }
    }).subscribe(({ data }) => {
    },(error) => {
      console.log(error)
      this.snackBar.open('Error occured sending book order. Please try again later', null, {
        duration: 2000,
      });
    },
    () => this.router.navigate(['/view-orders'])
    );
  }

  ngDestroy(): void{
    if(this.bookServiceSubscription) this.bookServiceSubscription.unsubscribe();
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
