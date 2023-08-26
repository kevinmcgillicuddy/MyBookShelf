import { Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookData } from 'src/app/models/bookData';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html'
})

export class CrudComponent  {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: BookData) { }
  form: FormGroup<{
    Author: FormControl<string | null>,
    Category: FormControl<CategoryType | null>,
    Title: FormControl<string | null>,
    isbn: FormControl<string | null>,
    pages: FormControl<number | null>,
    year_read: FormControl<number | null>,
  }>  =  this.formBuilder.group({
    Author: [this.data.Author, Validators.required],
    Category: [this.data.Category, Validators.required],
    Title: [this.data.Title, Validators.required],
    isbn: [this.data.isbn, Validators.required],
    pages: [this.data.pages, [Validators.required, Validators.max(2000), Validators.min(1)]],
    year_read: [this.data.year_read, [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(2006)]],
  });
}

type CategoryType = 'Fiction' | 'Non Fiction' | 'Theology';
