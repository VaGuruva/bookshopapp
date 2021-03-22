import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStore } from '../../services';
import { Book } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStore
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

  setImgUrl(isbn: string): string{
    return `http://ec2-3-17-150-219.us-east-2.compute.amazonaws.com:3000/books/${isbn}.jpeg`
  }

  ngDestroy(): void{
    if(this.bookServiceSubscription) this.bookServiceSubscription.unsubscribe();
    if(this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
