import { NgModule } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { MockStore } from './mock-store';

@NgModule({
  imports: [NgxsModule.forRoot()],
  providers: [{ provide: Store, useClass: MockStore }],
})
export class NgxsTestingModule {}
