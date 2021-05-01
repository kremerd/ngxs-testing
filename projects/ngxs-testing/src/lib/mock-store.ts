import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { defer, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActionStorage } from './action-storage';
import { SelectorStorage } from './selector-storage';

@Injectable()
export class MockStore extends Store {
  dispatch(actionOrActions: any): Observable<any> {
    if (Array.isArray(actionOrActions)) {
      actionOrActions.forEach((action) => ActionStorage.recordAction(action));
    } else {
      ActionStorage.recordAction(actionOrActions);
    }
    return super.dispatch(actionOrActions);
  }

  select(selector: any): Observable<any> {
    return defer(() => SelectorStorage.getSelectorSubject(selector));
  }

  selectOnce(selector: any): Observable<any> {
    return defer(() => SelectorStorage.getSelectorSubject(selector)).pipe(
      take(1)
    );
  }

  selectSnapshot(selector: any): any {
    const selectorSubject = SelectorStorage.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      throw selectorSubject.thrownError;
    }
    return selectorSubject.value;
  }
}
