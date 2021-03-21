import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { BOOKS_QUERY } from '../../app/queries/books';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  books: any[];
  loading = true;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .query<any>({
        query: BOOKS_QUERY
      })
      .subscribe(
        ({ data }) => {
          this.books = data && data.books;
        }
      );
  }
}
