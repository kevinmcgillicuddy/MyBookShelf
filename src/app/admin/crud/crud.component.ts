import { Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BookData } from 'src/app/models/bookData';
import { AngularFireService } from 'src/services/angular-fire.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html'
})

export class CrudComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: BookData, private angularFire: AngularFireService, public dialog: MatDialog) { }

  public form =  this.formBuilder.group({
    Author: ['', Validators.required],
    Category: ['Fiction', Validators.required],
    Title: ['', Validators.required],
    isbn: ['', Validators.required],
    pages: [0, [Validators.required, Validators.max(2000), Validators.min(1)]],
    year_read: [new Date().getFullYear(), [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(2006)]],
    img_url: ['']
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
        img_url: this.data.img_url
      });
    }
  }

  onDelete(id:string | undefined): void {
    if(id){
      this.angularFire.deleteBookData(id)
    };
    this.dialog.closeAll();
  }
}
