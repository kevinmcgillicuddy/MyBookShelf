import { Component } from '@angular/core';
import { AngularFireService } from 'src/services/angular-fire.service';

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
    console.log('scrolling')
    this.angularFireService.getMoreShelfData();
  }
}
