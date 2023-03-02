import { Component, Input } from '@angular/core';
import { bookData } from '../models/bookData';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
@Input() book?: bookData[];
}
