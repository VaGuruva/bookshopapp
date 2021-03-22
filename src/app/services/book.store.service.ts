import { Injectable } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Books } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookStore extends StoreService<Books> {
  protected store = 'book';

  constructor() {
    super({});
  }
}
