import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class MockStore extends Store {
  private selectorSubjects = new Map<any, BehaviorSubject<any>>();

  select(selector: any): Observable<any> {
    return (
      this.selectorSubjects.get(selector)?.asObservable() ??
      throwError(`No value set for selector {{selector}}.`)
    );
  }

  selectOnce(selector: any): Observable<any> {
    return (
      this.selectorSubjects.get(selector)?.asObservable()?.pipe(take(1)) ??
      throwError(`No value set for selector {{selector}}.`)
    );
  }

  selectSnapshot(selector: any): any {
    const selectorSubject = this.selectorSubjects.get(selector);
    if (!selectorSubject) {
      throw new Error(`No value set for selector {{selector}}.`);
    }
    return selectorSubject.getValue();
  }

  setSelectorValue(selector: any, value: any): void {
    const selectorSubject = this.selectorSubjects.get(selector);
    if (selectorSubject) {
      selectorSubject.next(value);
    } else {
      const newSubject = new BehaviorSubject(value);
      this.selectorSubjects.set(selector, newSubject);
    }
  }
}
