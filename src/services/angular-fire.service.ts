import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { BehaviorSubject, firstValueFrom, forkJoin, map, Observable, scan, take, tap } from 'rxjs';
import { BookData } from 'src/app/models/bookData';
@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject<any>([]);

  // Observable data
  data$?: Observable<BookData[] | undefined>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();


  private _booksData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: BookData[];
    error?: any;
    finished?: boolean;
    cursor?: any;
  }>({});


  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  generateCollection(cursor?: QueryDocumentSnapshot<DocumentData>) {
    return this.afs.collection<BookData>('Bookshelf', ref => {
      return cursor ?  ref.orderBy('year_read', 'desc').limit(8).startAfter(cursor) : ref.orderBy('year_read', 'desc').limit(8)
    })
  }

  //move this to the constructor?
  public getInitBookView() {
    this.mapAndUpdateBookData(this.generateCollection())
    // Create the observable array for consumption in components
    // this.data$ = this._booksData$.asObservable().pipe(
    //   map(({ result })=> result),
    //   scan((acc, val) => {
    //     return acc.concat(val)
    //   })
    // )
  }

  public getMore(){
    console.log('getMore')
    this._booksData$.next({ ...this._booksData$.value, cursor: this._booksData$.value.result?.length || null });
    this.mapAndUpdateBookData(this.generateCollection(this._booksData$.value.cursor))
  }

  private mapAndUpdateBookData(col: AngularFirestoreCollection<BookData>): void {

    if (this._booksData$.getValue().finished || this._booksData$.getValue().isProcessing) return;
    // loading
    this._booksData$.next({ ...this._booksData$.value, isProcessing: true });

    // Map snapshot with doc ref (needed for cursor)
     col.valueChanges()
      .pipe(
        map((arr) => {
          let values = arr.map(snap =>snap as BookData)

          // update source with new values, done loading
          this._data.next(values)
          this._loading.next(false)

          // no more values, mark done
          if (!values.length) {
            this._booksData$.next({...this._booksData$.value, finished: true})
          }
        },
        take(1))
      )
      .subscribe((d)=>{console.log('d: ', d)})

  }
}
