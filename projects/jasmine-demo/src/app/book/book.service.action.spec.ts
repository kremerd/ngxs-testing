import { TestBed } from '@angular/core/testing';
import {
  getDispatchedActions,
  NgxsTestingModule,
} from 'projects/ngxs-testing/src/public-api';
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

  it('should have an empty list of dispatched actions on init', () => {
    expect(getDispatchedActions()).toEqual([]);
  });

  describe('addBook simple', () => {
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

    it('should add one item to the list of dispatched actions', () => {
      service.addBook(buildBook());
      expect(getDispatchedActions()).toEqual([new AddBook(buildBook())]);
    });
  });

  describe('addBook times', () => {
    it('should dispatch an instance of AddBook once', () => {
      service.addBook(buildBook());
      expect(jasmine.any(AddBook)).toHaveBeenDispatchedTimes(1);
    });

    it('should not dispatch an instance of AddBook twice', () => {
      service.addBook(buildBook());
      expect(jasmine.any(AddBook)).not.toHaveBeenDispatchedTimes(2);
    });

    it('should dispatch a specific AddBook instance once', () => {
      service.addBook(buildBook());
      expect(new AddBook(buildBook())).toHaveBeenDispatchedTimes(1);
    });

    it('should not dispatch a specific AddBook instance twice', () => {
      service.addBook(buildBook());
      expect(new AddBook(buildBook())).not.toHaveBeenDispatchedTimes(2);
    });

    it('should not dispatch an instance of DeleteBook once', () => {
      service.addBook(buildBook());
      expect(jasmine.any(DeleteBook)).not.toHaveBeenDispatchedTimes(1);
    });

    it('should not dispatch a specific DeleteBook instance once', () => {
      service.addBook(buildBook());
      expect(new DeleteBook(buildBook())).not.toHaveBeenDispatchedTimes(1);
    });
  });

  describe('addFirstLaw simple', () => {
    it('should dispatch an instance of AddBook', () => {
      service.addFirstLaw();
      expect(jasmine.any(AddBook)).toHaveBeenDispatched();
    });

    it('should dispatch an AddBook instance for the first book', () => {
      service.addFirstLaw();
      expect(
        new AddBook({
          title: 'The Blade Itself',
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

    it('should add three items to the list of dispatched actions', () => {
      service.addFirstLaw();
      expect(getDispatchedActions()).toEqual([
        new AddBook({
          title: 'The Blade Itself',
          author: 'Joe Abercrombie',
        }),
        new AddBook({
          title: 'Before They Are Hanged',
          author: 'Joe Abercrombie',
        }),
        new AddBook({
          title: 'Last Argument Of Kings',
          author: 'Joe Abercrombie',
        }),
      ]);
    });
  });

  describe('addFirstLaw times', () => {
    it('should not dispatch an instance of AddBook only once', () => {
      service.addFirstLaw();
      expect(jasmine.any(AddBook)).not.toHaveBeenDispatchedTimes(1);
    });

    it('should dispatch an instance of AddBook thrice', () => {
      service.addFirstLaw();
      expect(jasmine.any(AddBook)).toHaveBeenDispatchedTimes(3);
    });

    it('should dispatch an AddBook instance for the first book once', () => {
      service.addFirstLaw();
      expect(
        new AddBook({
          title: 'Before They Are Hanged',
          author: 'Joe Abercrombie',
        })
      ).toHaveBeenDispatchedTimes(1);
    });

    it('should not dispatch an AddBook instance for the first book thrice', () => {
      service.addFirstLaw();
      expect(
        new AddBook({
          title: 'Before They Are Hanged',
          author: 'Joe Abercrombie',
        })
      ).not.toHaveBeenDispatchedTimes(3);
    });

    it('should not dispatch an instance of DeleteBook thrice', () => {
      service.addFirstLaw();
      expect(jasmine.any(DeleteBook)).not.toHaveBeenDispatchedTimes(3);
    });
  });

  const buildBook = (title?: string): Book => ({
    title: title ?? 'book title',
    author: 'book author',
  });
});
