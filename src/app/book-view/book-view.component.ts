import { Component, OnInit,inject } from '@angular/core';
import { BehaviorSubject, firstValueFrom, forkJoin, Observable, scan, take, tap  } from 'rxjs';
import { BookData } from '../models/bookData';
import { collection, query, orderBy, startAfter, limit, getDocs, DocumentData, Query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { FirebaseApp } from '@angular/fire/compat';
import { HttpClient } from '@angular/common/http';
import { BookImg } from '../models/imgData';
import { Firestore } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireService } from 'src/services/angular-fire.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
})
export class BookViewComponent implements OnInit {

  constructor(private http: HttpClient,
    private angularFireService: AngularFireService, private afs: AngularFirestore, private readonly firebaseApp: FirebaseApp) {

  }

  public booksData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: BookData[];
    error?: any;
    finished?:boolean;
    cursor?: QueryDocumentSnapshot<DocumentData>;
  }>({});

  private lastVisible?: QueryDocumentSnapshot<DocumentData>;
  private next?: Query<DocumentData>;

  //new stuff
    // Observable data
  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject<any>([]);

   // Observable data
  data?: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

    //end new stuff

  async ngOnInit(): Promise<void> {
    this.angularFireService.getInitBookView();

      const first = this.afs.collection<BookData>('Bookshelf', ref => {
        return ref
                .orderBy('year_read', 'desc' )
                .limit(8)
      })

      this.mapAndUpdate2(first)
      // Create the observable array for consumption in components
      this.data = this._data.asObservable().pipe(
        scan( (acc, val) => {
          return acc.concat(val)
        })
      )

    }

    more() {
      const cursor = this.getCursor()
      const more = this.afs.collection('Bookshelf', ref => {
        return ref
                .orderBy('year_read', 'desc' )
                .limit(8)
                .startAfter(cursor)
      })
      this.mapAndUpdate2(more)
    }

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate2(col: AngularFirestoreCollection<any>) {

    if (this._done.getValue() || this._loading.getValue()) { return };

    // loading
    this._loading.next(true)

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .pipe(
        tap((arr) => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { ...data, doc }
        })

        // If prepending, reverse the batch order
        values = values

        // update source with new values, done loading
        this._data.next(values)
        this._loading.next(false)

        // no more values, mark done
        if (!values.length) {
          this._done.next(true)
        }
    },
    take(1))
    )
    .subscribe(console.log)

  }

      // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this._data.getValue()
    if (current.length) {
      return current[current.length - 1].doc
    }
    return null
  }


  async onScroll(): Promise<void> {
    this.angularFireService.getMore();
    this.more();
    // this.afs.collection<BookData>('Bookshelf',ref => ref.startAfter()).get().subscribe((data) => {console.log(data)})
    // Set the isProcessing flag to true
    this.booksData$.next({ ...this.booksData$.value, isProcessing: true });

    // Query the next page of docs and map the data
    const data = await this.getDataAndMap(this.next!);
    // Set the data to the booksData$ BehaviorSubject
    this.booksData$.next({ result: this.booksData$.value?.result?.concat(data), isProcessing: false });
  }




  async getDataAndMap(searchQuery?: Query<DocumentData>): Promise<BookData[]> {
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
    } as BookData));
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
