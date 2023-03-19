import { Injectable } from '@angular/core';
import { Firestore, collectionData, } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseApp } from '@angular/fire/compat';
import { firstValueFrom, from, map, Observable, switchMap, tap } from 'rxjs';
import { bookData } from '../models/bookData';
import { doc, DocumentData, getDoc, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseServicesService {

  constructor(private readonly firebaseApp: FirebaseApp) { }
  getBooks(): Observable<DocumentData[]> {
    return collectionData(query(collection(this.firebaseApp.firestore(), "Bookshelf"), orderBy("year_read", "desc"), limit(5)))
  }
}


