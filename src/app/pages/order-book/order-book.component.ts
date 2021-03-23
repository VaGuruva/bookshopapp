import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStore } from '../../services';
import { Book, Order } from 'src/app/models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BuyBookComponent } from 'src/app/components/buy-book/buy-book.component';
import { CREATE_ORDER } from '../../mutations';
import { Apollo } from "apollo-angular";

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
    private apollo: Apollo
  ) { }

  book: Book;
  selectedBook: Book;
  imgUrl: string
  routeSubscription: Subscription;
  bookServiceSubscription: Subscription;

  ngOnInit(): void {
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
    if(this.selectedBook.isbn == isbn){
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
    this.apollo.mutate({
      mutation: CREATE_ORDER,
      variables: orderInfo
    }).subscribe(({ data }) => {
      console.log('got data', data);
      //on success redirect to order list page
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ngDestroy(): void{
    if(this.bookServiceSubscription) this.bookServiceSubscription.unsubscribe();
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
