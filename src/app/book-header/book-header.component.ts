import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-book-header',
  templateUrl: './book-header.component.html',
})
export class BookHeaderComponent {
    authState$: Observable<boolean> = this.auth.authState.pipe(map((user) => !!user));
    constructor(private auth: AngularFireAuth) { }
    logout(): void {
        this.auth.signOut();
    }
}
