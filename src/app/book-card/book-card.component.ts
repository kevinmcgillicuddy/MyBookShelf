import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookData } from '../models/bookData';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html'
})
export class BookCardComponent {
  public loadingArray = Array.from({ length: 6 });
  @Input() books?: BookData[];
  @Output() editBook = new EventEmitter<BookData>();
  public onEdit(index: number){
    console.log(index)
    this.editBook.emit(this.books![index]);
    console.log(this.books![index])
  }
}
