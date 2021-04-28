import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { append, patch, removeItem } from '@ngxs/store/operators';
import { AddBook, DeleteBook } from './book.actions';
import { Book, BookStateModel } from './model';

@State<BookStateModel>({
  name: 'book',
  defaults: {
    books: [],
  },
})
@Injectable()
export class BookState {
  @Selector([BookState])
  static books({ books }: BookStateModel): Book[] {
    return books;
  }

  @Action(AddBook)
  addBook(ctx: StateContext<BookStateModel>, { book }: AddBook): void {
    ctx.setState(
      patch({
        books: append([book]),
      })
    );
  }

  @Action(DeleteBook)
  deleteBook(ctx: StateContext<BookStateModel>, { book }: DeleteBook): void {
    ctx.setState(
      patch({
        books: removeItem<Book>(
          (b) => b?.title === book.title && b?.author === book.author
        ),
      })
    );
  }
}
