import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, of, Subject, take, tap } from 'rxjs';
import { bookData } from './models/bookData';
import { FirebaseServicesService } from './services/firebase-services.service';
import { doc, DocumentData, getDoc, Query, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { FirebaseApp } from '@angular/fire/compat';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private readonly firebaseApp: FirebaseApp) { }
  public booksData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: bookData[];
    error?: any;
  }>({});
  private lastVisible?: QueryDocumentSnapshot<DocumentData>;
  private next?: Query<DocumentData>;

  async ngOnInit(): Promise<void> {
    // Query the first page of docs
    const first = query(collection(this.firebaseApp.firestore(), "Bookshelf"), orderBy("year_read", 'desc'), limit(8));
    const firstSnapshots = of(await getDocs(first));
    console.log(firstSnapshots.subscribe((d) => console.log(d.docs[0].data())))
    // let images: string[] = [];
    // for (const file of firstSnapshots.docs) {
    //   let img = await this.getImgs(file.data()['isbn'])
    //   if (img.items) {
    //     images.push(img.items[0]?.volumeInfo?.imageLinks?.smallThumbnail || 'https://dummyimage.com/720x400&text=%20')
    //   }
    //   else {
    //     images.push('https://dummyimage.com/720x400&text=%20')
    //   }

    // }
    // this.lastVisible = firstSnapshots.docs[firstSnapshots.docs.length - 1];
    // this.next = query(collection(this.firebaseApp.firestore(), "Bookshelf"),
    //   orderBy("year_read", 'desc'),
    //   startAfter(this.lastVisible),
    //   limit(6));
    // this.booksData$.next({ result: firstSnapshots.docs.map((d, i) => ({ ...d.data(), img_url: images[i] } as bookData)) })

  }


  async onScroll(): Promise<void> {
    this.booksData$.next({ ...this.booksData$.value, isProcessing: true })
    let nextSnapshots = await getDocs(this.next!)
    this.lastVisible = nextSnapshots.docs[nextSnapshots.docs.length - 1];
    let images: string[] = [];
    for (const file of nextSnapshots.docs) {
      let img = await this.getImgs(file.data()['isbn'])
      if (img.items) {
        images.push(img.items[0]?.volumeInfo?.imageLinks?.smallThumbnail || 'https://dummyimage.com/720x400&text=%20')
      }
      else {
        images.push('https://dummyimage.com/720x400&text=%20')
      }

    }
    this.next = query(collection(this.firebaseApp.firestore(), "Bookshelf"),
      orderBy("year_read", 'desc'),
      startAfter(this.lastVisible),
      limit(8));
    this.booksData$.next({ result: this.booksData$.value?.result?.concat(nextSnapshots.docs.map((d, i) => ({ ...d.data(), img_url: images[i] } as bookData))), isProcessing: false })
  }

  async getImgs(isbn: string): Promise<any> {
    return await firstValueFrom(this.http.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`))
  }
}

