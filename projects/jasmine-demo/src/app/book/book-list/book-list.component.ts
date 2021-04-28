import { Component } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  constructor(private bookService: BookService) {}

  books$ = this.bookService.books$;

  title = '';
  author = '';

  addBook(book: Book): void {
    this.bookService.addBook(book);
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book);
  }
}
