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

  getBooks(): Observable<Book[]> {
    return this.store.select(BookState.books);
  }

  getBooksOnce(): Observable<Book[]> {
    return this.store.selectOnce(BookState.books);
  }

  getBooksSnapshot(): Book[] {
    return this.store.selectSnapshot(BookState.books);
  }

  addBook(book: Book): void {
    this.store.dispatch(new AddBook(book));
  }

  addFirstLaw(): void {
    this.store.dispatch([
      new AddBook({ title: 'The Blade Itself', author: 'Joe Abercrombie' }),
      new AddBook({
        title: 'Before They Are Hanged',
        author: 'Joe Abercrombie',
      }),
      new AddBook({
        title: 'Last Argument Of Kings',
        author: 'Joe Abercrombie',
      }),
    ]);
  }

  deleteBook(book: Book): void {
    this.store.dispatch(new DeleteBook(book));
  }
}
