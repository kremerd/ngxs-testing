import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class MockStore extends Store {
  private selectorSubjects = new Map<any, BehaviorSubject<any>>();

  select(selector: any): Observable<any> {
    return this.getSelectorSubject(selector).asObservable();
  }

  selectOnce(selector: any): Observable<any> {
    return this.getSelectorSubject(selector).asObservable().pipe(take(1));
  }

  selectSnapshot(selector: any): any {
    const selectorSubject = this.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      throw selectorSubject.thrownError;
    }
    return selectorSubject.value;
  }

  setSelectorValue(selector: any, value: any): void {
    const selectorSubject = this.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      const newSubject = new BehaviorSubject(value);
      this.selectorSubjects.set(selector, newSubject);
    } else {
      selectorSubject.next(value);
    }
  }

  setSelectorError(selector: any, error: any): void {
    const selectorSubject = this.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      const newSubject = new BehaviorSubject(undefined);
      newSubject.error(error);
      this.selectorSubjects.set(selector, newSubject);
    } else {
      selectorSubject.error(error);
    }
  }

  private getSelectorSubject(selector: any): BehaviorSubject<any> {
    let selectorSubject = this.selectorSubjects.get(selector);
    if (!selectorSubject) {
      selectorSubject = new BehaviorSubject(undefined);
      selectorSubject.error(`No value set for selector ${selector}.`);
      this.selectorSubjects.set(selector, selectorSubject);
    }
    return selectorSubject;
  }
}
