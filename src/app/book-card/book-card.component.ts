import { Component, Input } from '@angular/core';
import { BookData } from '../models/bookData';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html'
})
export class BookCardComponent {
  loadingArray = Array.from({ length: 6 });
  @Input() books?: BookData[];
}
