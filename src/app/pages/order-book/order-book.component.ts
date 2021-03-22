import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  bookOrderForm: FormGroup;

  ngOnInit(): void {
    this.bookOrderForm = this.formBuilder.group({
      currentSalary: ["", {
        validators: [
          Validators.required
        ]
      }],
      expectedPosition: ['']
    });

    this.route.queryParams.subscribe(params => {
      console.log('params', params)
    });
  }

}
