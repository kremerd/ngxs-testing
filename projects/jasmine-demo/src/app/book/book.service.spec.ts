import { TestBed } from '@angular/core/testing';
import { NgxsTestBed } from 'projects/ngxs-testing/src/lib/ngxs-test-bed';
import { NgxsTestingModule } from 'projects/ngxs-testing/src/public-api';
import { runWithTestScheduler } from '../run-with-test-scheduler';
import { BookService } from './book.service';
import { BookState } from './book.state';
import { Book } from './model';

describe('BookService', () => {
  let service: BookService;
  let ngxsTestBed: NgxsTestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsTestingModule],
    });
    service = TestBed.inject(BookService);
    ngxsTestBed = TestBed.inject(NgxsTestBed);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('books$', () => {
    it('should be an error observable when books are not mocked', () => {
      runWithTestScheduler((rh) => {
        const books$ = service.books$;
        rh.expectObservable(books$).toBe('#', undefined, jasmine.any(String));
      });
    });

    it('should be a non-completing observable of the currently mocked books', () => {
      runWithTestScheduler((rh) => {
        ngxsTestBed.setSelectorValue(BookState.books, [buildBook()]);
        const books$ = service.books$;
        rh.expectObservable(books$).toBe('x', { x: [buildBook()] });
      });
    });

    it('should allow to change the books over time', () => {
      runWithTestScheduler((rh) => {
        ngxsTestBed.setSelectorValue(BookState.books, []);
        const books$ = service.books$;
        rh.cold('10ms x').subscribe(() =>
          ngxsTestBed.setSelectorValue(BookState.books, [buildBook('1')])
        );
        rh.cold('20ms x').subscribe(() =>
          ngxsTestBed.setSelectorValue(BookState.books, [buildBook('2')])
        );
        rh.expectObservable(books$).toBe('x 9ms y 9ms z', {
          x: [],
          y: [buildBook('1')],
          z: [buildBook('2')],
        });
      });
    });
  });

  describe('selectBooks', () => {
    it('should return an error observable when books are not mocked', () => {
      runWithTestScheduler((rh) => {
        const books$ = service.getBooks();
        rh.expectObservable(books$).toBe('#', undefined, jasmine.any(String));
      });
    });

    it('should return a non-completing observable of the currently mocked books', () => {
      runWithTestScheduler((rh) => {
        ngxsTestBed.setSelectorValue(BookState.books, [buildBook()]);
        const books$ = service.getBooks();
        rh.expectObservable(books$).toBe('x', { x: [buildBook()] });
      });
    });

    it('should allow to change the books over time', () => {
      runWithTestScheduler((rh) => {
        ngxsTestBed.setSelectorValue(BookState.books, []);
        const books$ = service.getBooks();
        rh.cold('10ms x').subscribe(() =>
          ngxsTestBed.setSelectorValue(BookState.books, [buildBook('1')])
        );
        rh.cold('20ms x').subscribe(() =>
          ngxsTestBed.setSelectorValue(BookState.books, [buildBook('2')])
        );
        rh.expectObservable(books$).toBe('x 9ms y 9ms z', {
          x: [],
          y: [buildBook('1')],
          z: [buildBook('2')],
        });
      });
    });
  });

  describe('selectBooksOnce', () => {
    it('should return an error observable when books are not mocked', () => {
      runWithTestScheduler((rh) => {
        const books$ = service.getBooksOnce();
        rh.expectObservable(books$).toBe('#', undefined, jasmine.any(String));
      });
    });

    it('should return a one-emit observable of the currently mocked books', () => {
      runWithTestScheduler((rh) => {
        ngxsTestBed.setSelectorValue(BookState.books, [buildBook()]);
        const books$ = service.getBooksOnce();
        rh.expectObservable(books$).toBe('(x|)', { x: [buildBook()] });
      });
    });
  });

  describe('selectBooksSnapshot', () => {
    it('should throw an error when books are not mocked', () => {
      try {
        service.getBooksSnapshot();
        fail('Expected getBooksSnapshot to throw an error');
      } catch {
        expect().nothing();
      }
    });

    it('should return a snapshot of the currently mocked books', () => {
      ngxsTestBed.setSelectorValue(BookState.books, [buildBook()]);
      const books = service.getBooksSnapshot();
      expect(books).toEqual([buildBook()]);
    });
  });

  const buildBook = (title?: string): Book => ({
    title: title ?? 'book title',
    author: 'book author',
  });
});
