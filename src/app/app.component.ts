import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom, forkJoin, Observable } from 'rxjs';
import { bookData } from './models/bookData';
import { DocumentData, Query, QueryDocumentSnapshot} from "firebase/firestore";
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { FirebaseApp } from '@angular/fire/compat';
import { HttpClient } from '@angular/common/http';
import { BookImg } from './models/imgData';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}

