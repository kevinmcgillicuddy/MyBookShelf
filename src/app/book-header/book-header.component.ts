import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CrudComponent } from '../admin/crud/crud.component';
import { AngularFireService } from 'src/services/angular-fire.service';
import { BookData } from '../models/bookData';

@Component({
  selector: 'app-book-header',
  templateUrl: './book-header.component.html',
})
export class BookHeaderComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();
  public authState$: Observable<boolean> = this.auth.authState.pipe(map((user) => !!user));

  constructor(private readonly auth: AngularFireAuth, private readonly dialog: MatDialog, private readonly angularFireService: AngularFireService) { }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  public logout(): void {
    this.auth.signOut();
  }

  public addBook(): void {
    const dialogRef = this.dialog.open(CrudComponent);
    const afterClosed = dialogRef.afterClosed();
    afterClosed.pipe(takeUntil(this.destroy$)).subscribe((result?: BookData) => {
      if (!result) return;
      this.angularFireService.updateSingleBookData(result).then(() => dialogRef.close())
    });
  }
}
