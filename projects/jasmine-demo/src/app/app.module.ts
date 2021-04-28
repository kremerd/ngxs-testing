import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BookModule,
    BrowserModule,
    NgxsModule.forRoot(undefined, {
      selectorOptions: { injectContainerState: false, suppressErrors: false },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
