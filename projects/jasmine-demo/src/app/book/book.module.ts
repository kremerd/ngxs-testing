import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { BookListComponent } from './book-list/book-list.component';
import { BookState } from './book.state';

@NgModule({
  declarations: [BookListComponent],
  imports: [CommonModule, FormsModule, NgxsModule.forFeature([BookState])],
  exports: [BookListComponent],
})
export class BookModule {}
