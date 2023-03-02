import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { bookData } from './models/bookData';
import { FirebaseServicesService } from './services/firebase-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myBookShelf';

  constructor(private bookService: FirebaseServicesService) { }
  stuff$ = new BehaviorSubject<any | undefined>(undefined);
  ngOnInit(): void {
 this.bookService.getBooks().subscribe((data) => {console.log(data); this.stuff$.next(data)});
  }


  onScroll(){
    console.log('loding',   this.stuff$.value?.length)
    this.bookService.getMoreBooks().pipe(tap(console.log)).subscribe((data) => this.stuff$.next(data));

  // this.bookService.getMoreBooks().subscribe((data) => this.stuff$.next([...this.stuff$.value!,...data]))
    // .subscribe((data) => this.stuff$.next(data));
  }
}

