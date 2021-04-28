import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddBook, DeleteBook } from './book.actions';
import { BookState } from './book.state';
import { Book } from './model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private store: Store) {}

  @Select(BookState.books)
  books$!: Observable<Book[]>;

  addBook(book: Book): void {
    this.store.dispatch(new AddBook(book));
  }

  deleteBook(book: Book): void {
    this.store.dispatch(new DeleteBook(book));
  }
}
