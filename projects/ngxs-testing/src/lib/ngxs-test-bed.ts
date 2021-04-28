import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngxs/store';
import { MockStore } from './mock-store';

@Injectable({ providedIn: 'root' })
export class NgxsTestBed {
  constructor(@Inject(Store) @Optional() private store: MockStore) {
    if (!(store instanceof MockStore)) {
      throw new Error(
        'To use NgxsTestBed you need to import NgxsTestingModule.'
      );
    }
  }

  setSelectorValue(selector: any, value: any): NgxsTestBed {
    this.store.setSelectorValue(selector, value);
    return this;
  }
}
