import { TestBed } from '@angular/core/testing';
import {
  mockSelector,
  NgxsTestingModule,
} from 'projects/ngxs-testing/src/public-api';
import { runWithTestScheduler } from '../run-with-test-scheduler';
import { BookService } from './book.service';
import { BookState } from './book.state';
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

  describe('books$', () => {
    it('should be an error observable when books are not mocked', () => {
      runWithTestScheduler((rh) => {
        const books$ = service.books$;
        rh.expectObservable(books$).toBe('#', undefined, jasmine.any(String));
      });
    });

    it('should be a non-completing observable of the currently mocked books', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toReturn([buildBook()]);
        const books$ = service.books$;
        rh.expectObservable(books$).toBe('x', { x: [buildBook()] });
      });
    });

    it('should return an error observable when books are mocked to error', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toError(new Error('Test'));
        const books$ = service.books$;
        rh.expectObservable(books$).toBe('#', undefined, new Error('Test'));
      });
    });

    it('should allow to change the books over time', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toReturn([]);
        const books$ = service.books$;
        rh.cold('10ms x').subscribe(() =>
          mockSelector(BookState.books).toReturn([buildBook('1')])
        );
        rh.cold('20ms x').subscribe(() =>
          mockSelector(BookState.books).toReturn([buildBook('2')])
        );
        rh.expectObservable(books$).toBe('x 9ms y 9ms z', {
          x: [],
          y: [buildBook('1')],
          z: [buildBook('2')],
        });
      });
    });

    it('should allow to error at a later point in time', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toReturn([]);
        const books$ = service.books$;
        rh.cold('10ms x').subscribe(() =>
          mockSelector(BookState.books).toReturn([buildBook()])
        );
        rh.cold('20ms x').subscribe(() =>
          mockSelector(BookState.books).toError(new Error('Test'))
        );
        rh.expectObservable(books$).toBe(
          'x 9ms y 9ms #',
          {
            x: [],
            y: [buildBook()],
          },
          new Error('Test')
        );
      });
    });

    it('should allow to reset errors', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toError(new Error('Test'));
        mockSelector(BookState.books).toReturn([buildBook()]);
        const books$ = service.books$;
        rh.expectObservable(books$).toBe('x', { x: [buildBook()] });
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
        mockSelector(BookState.books).toReturn([buildBook()]);
        const books$ = service.getBooks();
        rh.expectObservable(books$).toBe('x', { x: [buildBook()] });
      });
    });

    it('should return an error observable when books are mocked to error', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toError(new Error('Test'));
        const books$ = service.getBooks();
        rh.expectObservable(books$).toBe('#', undefined, new Error('Test'));
      });
    });

    it('should allow to change the books over time', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toReturn([]);
        const books$ = service.getBooks();
        rh.cold('10ms x').subscribe(() =>
          mockSelector(BookState.books).toReturn([buildBook('1')])
        );
        rh.cold('20ms x').subscribe(() =>
          mockSelector(BookState.books).toReturn([buildBook('2')])
        );
        rh.expectObservable(books$).toBe('x 9ms y 9ms z', {
          x: [],
          y: [buildBook('1')],
          z: [buildBook('2')],
        });
      });
    });

    it('should allow to error at a later point in time', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toReturn([]);
        const books$ = service.getBooks();
        rh.cold('10ms x').subscribe(() =>
          mockSelector(BookState.books).toReturn([buildBook()])
        );
        rh.cold('20ms x').subscribe(() =>
          mockSelector(BookState.books).toError(new Error('Test'))
        );
        rh.expectObservable(books$).toBe(
          'x 9ms y 9ms #',
          {
            x: [],
            y: [buildBook()],
          },
          new Error('Test')
        );
      });
    });

    it('should allow to reset errors', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toError(new Error('Test'));
        mockSelector(BookState.books).toReturn([buildBook()]);
        const books$ = service.getBooks();
        rh.expectObservable(books$).toBe('x', { x: [buildBook()] });
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
        mockSelector(BookState.books).toReturn([buildBook()]);
        const books$ = service.getBooksOnce();
        rh.expectObservable(books$).toBe('(x|)', { x: [buildBook()] });
      });
    });

    it('should return an error observable when books are mocked to error', () => {
      runWithTestScheduler((rh) => {
        mockSelector(BookState.books).toError(new Error('Test'));
        const books$ = service.getBooksOnce();
        rh.expectObservable(books$).toBe('#', undefined, new Error('Test'));
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
      mockSelector(BookState.books).toReturn([buildBook()]);
      const books = service.getBooksSnapshot();
      expect(books).toEqual([buildBook()]);
    });

    it('should throw an error when books are mocked to error', () => {
      const error = new Error('Test');
      mockSelector(BookState.books).toError(error);
      try {
        service.getBooksSnapshot();
        fail('Expected getBooksSnapshot to throw an error');
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });

  const buildBook = (title?: string): Book => ({
    title: title ?? 'book title',
    author: 'book author',
  });
});
