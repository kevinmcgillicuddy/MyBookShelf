import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, BehaviorSubject, Subject, takeUntil, take, Observable, switchMap, forkJoin, delay } from 'rxjs';
import { AngularFireService } from 'src/services/angular-fire.service';
import { BookData } from '../models/bookData';
import { MatDialog } from '@angular/material/dialog';
import { CrudComponent } from '../admin/crud/crud.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BookImg } from '../models/imgData';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
})
export class BookSearchComponent {

  constructor(private readonly angularFireService: AngularFireService, private readonly dialog: MatDialog,private readonly formBuilder: FormBuilder, private readonly auth: AngularFireAuth) { }

  canEdit$: Observable<boolean> = this.auth.authState.pipe(map((user) => !!user));
  private destroy$ = new Subject<boolean>();
  public bookData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: BookData[]
  }>({
    result: []
  });
  public form: FormGroup<{ searchTerm: FormControl<string | null> }> = this.formBuilder.group({
    searchTerm: ['', Validators.required],
  });

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private openDialog(data?: BookData): void {
    if (!data) return;
      const dialogRef = this.dialog.open(CrudComponent, {
        data: {
          ...data
        },
      });
      dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result?: BookData) => {
        if (!result) return;
        this.angularFireService.updateSingleBookData(result, data.docId).then(()=>      dialogRef.close())

      });

  }


  public onSearch(): void {
    this.bookData$.next({ isProcessing: true })
    this.angularFireService.getAllBooks().pipe(
      filter(data => !!data),
      map((data) => {
        const normalizedSearchTerm = this.form.controls.searchTerm.value!.toLowerCase();
        return data.filter(book => {
          const normalizedTitle = book.Title.toString()?.toLowerCase();
          const normalizedAuthor = book?.Author?.toLowerCase();
          const normalizedCategory = book?.Category?.toLowerCase();
          return (
            normalizedTitle.includes(normalizedSearchTerm) ||
            normalizedAuthor.includes(normalizedSearchTerm) ||
            normalizedCategory.includes(normalizedSearchTerm)
          );
        });
      }),
      takeUntil(this.destroy$))
      .subscribe((value) => {
        this.bookData$.next({
          result: value,
          isProcessing: false
        });
      });
  }

  public onEditBook(index: BookData): void {
    this.angularFireService.getSingleBookDataByID(index.docId!).pipe(take(1),takeUntil(this.destroy$)).subscribe((data) => {
        this.openDialog(data);
      });
  }
}
