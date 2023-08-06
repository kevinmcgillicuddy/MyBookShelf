import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, filter, tap, debounceTime, distinctUntilChanged, map, BehaviorSubject } from 'rxjs';
import { AngularFireService } from 'src/services/angular-fire.service';
import { BookData } from '../models/bookData';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
})
export class BookSearchComponent {

  constructor(private readonly angularFireService: AngularFireService, private formBuilder: FormBuilder) { }

  bookData$ = new BehaviorSubject<{
    isProcessing?: boolean;
    result?: BookData[]}>({
      result:[]
    });
  form: FormGroup<{ searchTerm: FormControl<string | null> }> = this.formBuilder.group({
    searchTerm: ['', Validators.required],
  });
  onSearch(): void {
    this.bookData$.next({ isProcessing: true })
    this.angularFireService.getAllBooks().pipe(
      filter(data => !!data),
      map((data) => {
        const normalizedSearchTerm = this.form!.controls.searchTerm.value!.toLowerCase();
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
      }))
      .subscribe((value) => {
        this.bookData$.next({
          result: value,
          isProcessing: false
        });
      });
  }

  onEditBook(index: BookData): void {
    console.log('called')
    this.angularFireService.getBookData(index.fsId).subscribe((data) => {
      console.log(data)
    });
  }
}
