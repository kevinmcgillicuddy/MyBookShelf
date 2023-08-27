import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookData } from 'src/app/models/bookData';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html'
})

export class CrudComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: BookData) { }

  public form =  this.formBuilder.group({
    Author: ['', Validators.required],
    Category: ['Fiction', Validators.required],
    Title: ['', Validators.required],
    isbn: ['', Validators.required],
    pages: [0, [Validators.required, Validators.max(2000), Validators.min(1)]],
    year_read: [new Date().getFullYear(), [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(2006)]],
  });

  ngOnInit(): void {
    if(this.data){
      this.form.patchValue({
        Author: this.data.Author,
        Category: this.data.Category,
        Title: this.data.Title,
        isbn: this.data.isbn,
        pages: this.data.pages,
        year_read: this.data.year_read,
      });
    }
  }
}
