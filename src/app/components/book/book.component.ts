import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.book)
  }

  orderBook(){
    this.router.navigate(['/order'], { queryParams: { isbn: this.book.isbn } });
  }
}
