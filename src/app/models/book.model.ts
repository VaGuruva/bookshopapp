import { Publisher } from './publisher.model';
import { Author } from './author.model';

export class Book{
    title: string;
    isbn: string;
    publisher: Publisher;
    price: string;
    authors: Author[];
}

export class Books{
    books: Book[]
}