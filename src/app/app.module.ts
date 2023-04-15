import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookHeaderComponent } from './book-header/book-header.component';
import { BookViewComponent } from './book-view/book-view.component';
import { BookChartComponent } from './book-chart/book-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookSearchComponent } from './book-search/book-search.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
      BookHeaderComponent,
      BookViewComponent,
      BookChartComponent,
      BookSearchComponent
   ],
  imports: [
    InfiniteScrollModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
