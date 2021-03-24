import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../auth'

@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.component.html',
  styleUrls: ['./buy-book.component.scss']
})
export class BuyBookComponent implements OnInit {

  buyBookForm: FormGroup;
  numberPattern: string = '[1-9]\\d*$';
  bookIsbn: string;
  price: string;
  totalPrice: string = "0"

  constructor(
    public dialogRef: MatDialogRef<BuyBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.bookIsbn = this.data.isbn;
    this.price = this.data.price;
    this.initForm();
  }

  initForm(): void{
    this.buyBookForm = this.formBuilder.group({
      quantity: ["0", {
        validators: [
          Validators.pattern(this.numberPattern)
        ]
      }]
    });
  }

  calculatePrice(): void{
    if(this.buyBookForm.get('quantity').hasError('pattern')) return;
    let qty = this.buyBookForm.get('quantity').value?  parseInt(this.buyBookForm.get('quantity').value):0;
    this.totalPrice = (qty*parseFloat(this.price)).toFixed(2).toString();
  }

  confirmBookOrder(): void{
    if(this.buyBookForm.get('quantity').hasError('pattern')) return;
    const user = JSON.parse(localStorage.getItem('user'));
    
    this.dialogRef.close(JSON.stringify({
      quantity: this.buyBookForm.get('quantity').value,
      book: this.bookIsbn, 
      total: this.totalPrice,
      user: user.email
    }));
  }

  cancel(): void{
    this.dialogRef.close(false);
  }
}
