import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentData, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { BehaviorSubject, forkJoin, map, Observable, OperatorFunction, scan, switchMap, take, tap } from 'rxjs';
import { BookData } from 'src/app/models/bookData';
import { BookImg } from 'src/app/models/imgData';
@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  private _booksData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: BookData[];
    error?: any;
    finished?: boolean;
    cursor?: any;
  }>({
    result: [],
  });

  public bookData$ = this._booksData$.asObservable();

  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  public getAllBooks(): Observable<BookData[]> {
    return this.afs.collection<BookData>('Bookshelf').valueChanges();
  }
  //set the initial value when the service is called
  public getBookShelfData(): void{
        this.mapAndUpdateBookData(this.generateCollection())
  }
  /**
  * This method is called by the implementing component to load more books into the behaviorSubject
  *  */
  public getMoreShelfData():void {
    this.mapAndUpdateBookData(this.generateCollection(this._booksData$.value.cursor))
  }

  /**
 * This method generates a Firestore collection reference for the 'Bookshelf' collection.
 * The method accepts an optional QueryDocumentSnapshot object called 'cursor' which is used to specify
 * the starting point for the query. If no cursor is provided, the query starts from the beginning of the collection.
 *  */
  private generateCollection(cursor?: QueryDocumentSnapshot<DocumentData>):AngularFirestoreCollection<BookData> {
    return this.afs.collection<BookData>('Bookshelf', ref => {
      return cursor ? ref.orderBy('year_read', 'desc').startAfter(cursor).limit(8) : ref.orderBy('year_read', 'desc').limit(8)
    })
  }

  /**
 * This method maps and updates book data from a given AngularFirestoreCollection.
 * It first checks if the data is already finished or is currently processing, and if so, it returns immediately.
 * If the data is not finished or processing, it sets the 'isProcessing' property of the '_booksData$' BehaviorSubject to true.
 *
 * The method then retrieves the snapshot changes of the collection and pipes them through a series of operators:
 *  - The 'tap' operator checks if the length of the array of changes is zero and, if so, sets the 'finished' property of the '_booksData$'
 *    BehaviorSubject to true.
 *  - The 'switchMap' operator maps the array of changes to an array of BookData objects, and then maps each BookData object to an Observable
 *    of BookImg objects using the 'getImgs' method. These Observables are then combined into a single Observable using 'forkJoin'.
 *    Once the images are retrieved, the operator maps the original array of BookData objects to a new array of objects that includes the
 *    URL of the book cover image.
 *  - The 'take' operator ensures that the Observable completes after emitting a single value.
 *
 * The method then subscribes to the Observable and updates the '_booksData$' BehaviorSubject with the new data. The 'result' property
 * of the BehaviorSubject is updated by concatenating the current result with the new result.
 */
  private mapAndUpdateBookData(col: AngularFirestoreCollection<BookData>): void {
    if (this._booksData$.getValue().finished || this._booksData$.getValue().isProcessing) return;

    // Set isProcessing to true to indicate that the data is currently being processed.
    this._booksData$.next({ ...this._booksData$.value, isProcessing: true });

    // Get the snapshot changes of the collection and pipe them through a series of operators.
    col.snapshotChanges()
      .pipe(
        // Check if the length of the array of changes is zero and, if so, set 'finished' to true.
        tap((arr) => { if (arr.length === 0) this._booksData$.next({ ...this._booksData$.value, finished: true }) }),

        // Map the array of changes to an array of BookData objects and get the book cover images.
        switchMap((arr: DocumentChangeAction<BookData>[]) => {
          // Set the 'cursor' property of the '_booksData$' BehaviorSubject to the last document in the array of changes.
          this._booksData$.next({ ...this._booksData$.value, cursor: arr[arr.length - 1].payload.doc })

          // Map the array of changes to an array of BookData objects.
          const values = arr.map(snap => snap.payload.doc.data() as BookData)

          // Map each BookData object to an Observable of BookImg objects using the 'getImgs' method.
          const imgObservables = values.map(book => this.getImgs(book.isbn));

          // Combine the Observables of BookImg objects into a single Observable using 'forkJoin'.
          return forkJoin(imgObservables).pipe(
            // Map the original array of BookData objects to a new array that includes the URL of the book cover image or a default gray one.
            map((imgs: BookImg[]) => {
              return values.map((book, i) => {
                return { ...book, img_url: imgs[i]?.items ? imgs[i]?.items[0]?.volumeInfo?.imageLinks?.thumbnail : '/assets/imgs/placeHolder.jpg' };
              });
            })
          );
        }),
        // Ensure that the Observable completes after emitting a single value.
        take(1)
      )
      .subscribe((result) => this._booksData$.next({ ...this._booksData$.value, result: this._booksData$.value.result?.concat(...result), isProcessing: false }))
  }

  //takes an isbn number and returns an observable of BookImg from the Google Books API
  getImgs(isbn: string): Observable<BookImg> {
    return this.http.get<BookImg>(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
  }

}
