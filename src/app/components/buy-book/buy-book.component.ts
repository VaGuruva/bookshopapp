import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.component.html',
  styleUrls: ['./buy-book.component.scss']
})
export class BuyBookComponent implements OnInit {

  buyBookForm: FormGroup;
  numberPattern: string = '[1-9]\\d*$';
  bookIsbn: string;

  constructor(
    public dialogRef: MatDialogRef<BuyBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookIsbn = this.data.isbn;
    this.initForm();
  }

  initForm(): void{
    this.buyBookForm = this.formBuilder.group({
      quantity: ["", {
        validators: [
          Validators.pattern(this.numberPattern)
        ]
      }]
    });
  }

  confirmBookOrder(): void{
    this.dialogRef.close({isbn: this.bookIsbn, orderQuantity: ""});
  }

  cancel(): void{
    this.dialogRef.close(false);
  }
}
