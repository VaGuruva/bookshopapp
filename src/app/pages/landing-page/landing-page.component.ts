import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { Books } from 'src/app/models/book.model';
import { BOOKS_QUERY } from '../../queries/books';
import { BookStore } from '../../services/book.store.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  books: any[];
  loading = true;

  constructor(private apollo: Apollo, private bookStoreService: BookStore) { }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: BOOKS_QUERY
      })
      .subscribe(
        ({ data }) => {
          this.books = data && data.books;
          this.setBookData(data)
        }
      );
  }

  setBookData(data: Books): void{
    this.bookStoreService.set({
      books: data.books
    }, 'books update');
  }
}
