import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookStore } from '../../services';
import { Book } from 'src/app/models';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private bookStoreService: BookStore
  ) { }

  bookOrderForm: FormGroup;
  book: Book;
  imgUrl: string

  ngOnInit(): void {
    this.initForm();
    this.getRouteParams();
  }

  getRouteParams(): void{
    this.route.queryParams.subscribe(params => {
      if(params){
        this.getBookDetails(params.isbn)
      }
    });
  }

  getBookDetails(isbn: string): void{
    this.bookStoreService.state$.subscribe(data => {
      if(data){
        this.book = data.books.find(book => book.isbn == isbn);
        this.imgUrl = `http://ec2-3-17-150-219.us-east-2.compute.amazonaws.com:3000/books/${this.book.isbn}.jpeg`
      }  
    })
  }

  initForm(): void{
    this.bookOrderForm = this.formBuilder.group({
      currentSalary: ["", {
        validators: [
          Validators.required
        ]
      }],
      expectedPosition: ['']
    });
  }
}
