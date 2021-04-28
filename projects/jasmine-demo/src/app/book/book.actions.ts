import { Book } from './model';

export class AddBook {
  public static readonly type = '[Book] Add book';
  constructor(public book: Book) {}
}

export class DeleteBook {
  public static readonly type = '[Book] Delete book';
  constructor(public book: Book) {}
}
