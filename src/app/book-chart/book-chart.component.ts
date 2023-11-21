import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { BookData } from '../models/bookData';
import { AngularFireService } from 'src/services/angular-fire.service';
import { HostListener } from "@angular/core";
interface Count {
  name: string;
  value: number;
}
@Component({
  selector: 'app-book-chart',
  templateUrl: './book-chart.component.html',
  })

export class BookChartComponent implements OnInit {
  constructor( private readonly angularFireService: AngularFireService, ) { }
  public legendPosition: LegendPosition = LegendPosition.Below;
  public categoryBreakDown$ = new BehaviorSubject<Count[] | undefined>(undefined);
  public yearBreakDown$ = new BehaviorSubject<Count[] | undefined>(undefined);
  public pagesPerYearBreakDown$ = new BehaviorSubject<{name:string, series: Count[]}[] | undefined>(undefined);
  public bookData$ = new BehaviorSubject<[{name:string, value: number}] | undefined>(undefined);
  public screenWidth: number = Math.min(window.innerWidth, 700);;

  @HostListener('window:resize', ['$event'])
    onResize() {
      this.screenWidth = Math.min(window.innerWidth, 700);;
    }

  ngOnInit() {
    // Retrieve all book data from the "Bookshelf" collection in Firestore
    this.angularFireService.getAllBooks().pipe(take(1)).subscribe((data: BookData[]) => {
       // Calculate the breakdown of books by category and emit to categoryBreakDown$
    this.categoryBreakDown$.next(this.reduceBookDataToCounts(data, 'Category'));

    // Calculate the breakdown of books by year and emit to yearBreakDown$
    this.yearBreakDown$.next(this.reduceBookDataToCounts(data, 'year_read'));

    // Calculate the sum of pages read each year and emit to pagesPerYearBreakDown$
    this.pagesPerYearBreakDown$.next([{name:'Pages', series: this.reduceBookDataToCounts(data)}]);

    // Emit the total number of books to bookData$
    this.bookData$.next([{name:'Total Books', value: data.length}]);
    });
  }

  reduceBookDataToCounts(bookData: BookData[], sumBy?: keyof BookData): Count[] {
    // Generic function to reduce book data to counts
    const counts: { [key: string]: number } = {};

    for (const book of bookData) {
      // Either sum by the supplied key or by year_read
      const key = sumBy ? book[sumBy!] : book.year_read;

      if (key) {
        // Increment the count for the key if it exists on the counts object
        // or if no sumBy then increment by the year_read
        counts[key as string] = (counts[key as string] || 0) + (sumBy ? 1 : Number(book.year_read));
      }
    }

    const result: Count[] = [];

    for (const value in counts) {
      // Push the key and value to the result array
      if (counts.hasOwnProperty(value)) {
        result.push({ name: value, value: counts[value] });
      }
    }

    return result;
  }
}
