import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, forkJoin, Observable } from 'rxjs';
import { bookData } from '../models/bookData';
import { collection, query, orderBy, startAfter, limit, getDocs, DocumentData, Query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { FirebaseApp } from '@angular/fire/compat';
import { HttpClient } from '@angular/common/http';
import { BookImg } from '../models/imgData';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
})
export class BookViewComponent implements OnInit {

  constructor(private http: HttpClient, private readonly firebaseApp: FirebaseApp) { }

  public booksData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: bookData[];
    error?: any;
  }>({});

  private lastVisible?: QueryDocumentSnapshot<DocumentData>;
  private next?: Query<DocumentData>;

  async ngOnInit(): Promise<void> {
      // Query the first page of docs and map the data
    const data = await this.getDataAndMap();
    // Set the data to the booksData$ BehaviorSubject
    this.booksData$.next({ result: data });
  }

  async onScroll(): Promise<void> {
    // Set the isProcessing flag to true
    this.booksData$.next({ ...this.booksData$.value, isProcessing: true });
    // Query the next page of docs and map the data
    const data = await this.getDataAndMap(this.next!);
    // Set the data to the booksData$ BehaviorSubject
    this.booksData$.next({ result: this.booksData$.value?.result?.concat(data), isProcessing: false });
  }

  async getDataAndMap(searchQuery?: Query<DocumentData>): Promise<bookData[]> {
    // query the supplied query or the default query
    const data = await getDocs<DocumentData>(searchQuery || query(collection(this.firebaseApp.firestore(), "Bookshelf"), orderBy("year_read", 'desc'), limit(8)));
    // set the next query for next onScroll
    this.prepNext(data.docs[data.docs.length - 1]);
    // get the image data from google apis
    const imgData = await firstValueFrom(forkJoin(data.docs.map((d) => this.getImgs(d.data()['isbn']))));
    // map the data and return
    const result = data.docs.map((d, i) => ({
      ...d.data(),
      img_url: imgData![i].items[0]?.volumeInfo?.imageLinks?.smallThumbnail || 'https://dummyimage.com/720x400&text=%20'
    } as bookData));
    return result;
  }

  prepNext(nextVisible: QueryDocumentSnapshot<DocumentData> ): void {
    //this is the function that sets the next query based on the last visible document
    this.lastVisible = nextVisible;
    this.next = query(collection(this.firebaseApp.firestore(), "Bookshelf"),
      orderBy("year_read", 'desc'),
      startAfter(this.lastVisible),
      limit(6));
  }

  getImgs(isbn: string): Observable<BookImg> {
    return this.http.get<BookImg>(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
  }

}
