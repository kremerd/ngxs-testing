import { TestBed } from '@angular/core/testing';
import { NgxsTestingModule } from 'projects/ngxs-testing/src/public-api';
import { AddBook, DeleteBook } from './book.actions';
import { BookService } from './book.service';
import { Book } from './model';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsTestingModule],
    });
    service = TestBed.inject(BookService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('addBook', () => {
    it('should dispatch an instance of AddBook', () => {
      service.addBook(buildBook());
      expect(jasmine.any(AddBook)).toHaveBeenDispatched();
    });

    it('should dispatch a specific AddBook instance', () => {
      service.addBook(buildBook());
      expect(new AddBook(buildBook())).toHaveBeenDispatched();
    });

    it('should not dispatch an instance of DeleteBook', () => {
      service.addBook(buildBook());
      expect(jasmine.any(DeleteBook)).not.toHaveBeenDispatched();
    });

    it('should not dispatch a specific DeleteBook instance', () => {
      service.addBook(buildBook());
      expect(new DeleteBook(buildBook())).not.toHaveBeenDispatched();
    });
  });

  describe('addFirstLaw', () => {
    it('should dispatch an instance of AddBook', () => {
      service.addFirstLaw();
      expect(jasmine.any(AddBook)).toHaveBeenDispatched();
    });

    it('should dispatch an AddBook instance for the first book', () => {
      service.addFirstLaw();
      expect(
        new AddBook({
          title: 'Before They Are Hanged',
          author: 'Joe Abercrombie',
        })
      ).toHaveBeenDispatched();
    });

    it('should dispatch an AddBook instance for the second book', () => {
      service.addFirstLaw();
      expect(
        new AddBook({
          title: 'Before They Are Hanged',
          author: 'Joe Abercrombie',
        })
      ).toHaveBeenDispatched();
    });

    it('should dispatch an AddBook instance for the third book', () => {
      service.addFirstLaw();
      expect(
        new AddBook({
          title: 'Last Argument Of Kings',
          author: 'Joe Abercrombie',
        })
      ).toHaveBeenDispatched();
    });

    it('should not dispatch an instance of DeleteBook', () => {
      service.addFirstLaw();
      expect(jasmine.any(DeleteBook)).not.toHaveBeenDispatched();
    });
  });

  const buildBook = (title?: string): Book => ({
    title: title ?? 'book title',
    author: 'book author',
  });
});
