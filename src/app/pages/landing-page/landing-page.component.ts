import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Subscription } from 'rxjs';
import { Books } from 'src/app/models';
import { BOOKS_QUERY } from '../../queries';
import { BookStore } from '../../services';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  books: any[];
  loading = true;
  booksSubscription: Subscription;

  constructor(private apollo: Apollo, private bookStoreService: BookStore) { }

  ngOnInit(): void {
    this.booksSubscription = this.apollo
      .query<any>({
        query: BOOKS_QUERY
      })
      .subscribe(
        ({ data }) => {
          this.books = data && data.books;
          this.setBooksData(data)
        }
      );
  }

  setBooksData(data: Books): void{
    this.bookStoreService.set({
      books: data.books
    }, 'books update');
  }

  ngDestroy(): void{
    if(this.booksSubscription) this.booksSubscription.unsubscribe();
  }
}
