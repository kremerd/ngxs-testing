import { BehaviorSubject } from 'rxjs';

export class SelectorStorage {
  private static selectorSubjects: Map<any, BehaviorSubject<any>>;

  static reset(): void {
    SelectorStorage.selectorSubjects = new Map();
  }

  static setSelectorValue(selector: any, value: any): void {
    const selectorSubject = SelectorStorage.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      const newSubject = new BehaviorSubject(value);
      SelectorStorage.selectorSubjects.set(selector, newSubject);
    } else {
      selectorSubject.next(value);
    }
  }

  static setSelectorError(selector: any, error: any): void {
    const selectorSubject = SelectorStorage.getSelectorSubject(selector);
    if (selectorSubject.hasError) {
      const newSubject = new BehaviorSubject(undefined);
      newSubject.error(error);
      SelectorStorage.selectorSubjects.set(selector, newSubject);
    } else {
      selectorSubject.error(error);
    }
  }

  static getSelectorSubject(selector: any): BehaviorSubject<any> {
    let selectorSubject = SelectorStorage.selectorSubjects.get(selector);
    if (!selectorSubject) {
      selectorSubject = new BehaviorSubject(undefined);
      selectorSubject.error(`No value set for selector ${selector}.`);
      SelectorStorage.selectorSubjects.set(selector, selectorSubject);
    }
    return selectorSubject;
  }
}

beforeEach(() => SelectorStorage.reset());
