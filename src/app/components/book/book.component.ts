import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: any;
  imgUrl: string
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imgUrl = `http://ec2-3-17-150-219.us-east-2.compute.amazonaws.com:3000/books/${this.book.isbn}.jpeg`
  }

  orderBook(){
    this.router.navigate(['/order'], { queryParams: { isbn: this.book.isbn } });
  }
}
