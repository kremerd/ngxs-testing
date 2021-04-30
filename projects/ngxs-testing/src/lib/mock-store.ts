import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SelectorStorage } from './selector-storage';

@Injectable()
export class MockStore extends Store {
  select(selector: any): Observable<any> {
    return SelectorStorage.getSelectorSubject(selector).asObservable();
  }

  selectOnce(selector: any): Observable<any> {
    return SelectorStorage.getSelectorSubject(selector)
      .asObservable()
      .pipe(take(1));
  }

  selectSnapshot(selector: any): any {
    const selectorSubject = SelectorStorage.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      throw selectorSubject.thrownError;
    }
    return selectorSubject.value;
  }
}
