import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat'
import { LegendPosition } from '@swimlane/ngx-charts';
import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { bookData } from '../models/bookData';
interface Count {
  name: string;
  value: number;
}

@Component({
  selector: 'app-book-chart',
  templateUrl: './book-chart.component.html',
})



export class BookChartComponent implements OnInit {

  constructor( private readonly firebaseApp: FirebaseApp) { }
  public legendPosition: LegendPosition = LegendPosition.Below;
  public categoryBreakDown$ = new BehaviorSubject<Count[] | undefined>(undefined);
  public yearBreakDown$ = new BehaviorSubject<Count[] | undefined>(undefined);

  async ngOnInit() {
    const data =  (await getDocs<DocumentData>(query(collection(this.firebaseApp.firestore(), "Bookshelf")))).docs.map(d=>({...d.data() as bookData}));
    this.categoryBreakDown$.next(this.reduceBookDataToCounts(data, 'Category'));
    this.yearBreakDown$.next(this.reduceBookDataToCounts(data, 'year_read'));
  }

  reduceBookDataToCounts(bookData: bookData[], sumBy: keyof bookData ): Count[] {
    //generic function to reduce book data to counts
    const counts: { [key: string]: number } = {};
    for (const book of bookData) {
      const key = book[sumBy];
      if (key) {
        //increment the count for the key if it exists on the counts object
        counts[key as string] = (counts[key as string] || 0) + 1;
      }
    }
    const result: Count[] = [];
    for (const value in counts) {
      //push the key and value to the result array
      if (counts.hasOwnProperty(value)) {
        result.push({ name: value, value: counts[value] });
      }
    }
    return result;
  };
}
