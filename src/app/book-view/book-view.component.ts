import { Component } from '@angular/core';
import { AngularFireService } from 'src/services/angular-fire.service';
import { BookData } from '../models/bookData';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
})
export class BookViewComponent{

  constructor(private angularFireService: AngularFireService) {
    this.angularFireService.getBookShelfData();
  }

  public booksData$ = this.angularFireService.bookData$;

  async onScroll(): Promise<void> {
    this.angularFireService.getMoreShelfData();
  }
  onEditBook(index: BookData): void {
    console.log('asked for'+ index.isbn)
    this.angularFireService.getBookData(index.isbn).subscribe((data) => {
      console.log('got: ' + data)
    });
  }
}
