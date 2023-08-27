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
import { NgxsModule } from '@ngxs/store';
import { Books } from './state/books.state';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { LoginComponent } from './admin/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrudComponent } from './admin/crud/crud.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    CrudComponent,
    BookHeaderComponent,
    BookViewComponent,
    LoginComponent,
    BookChartComponent,
    BookSearchComponent
  ],
  imports: [
    InfiniteScrollModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserModule,
    NgxsModule.forRoot([Books.BookState], {
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
