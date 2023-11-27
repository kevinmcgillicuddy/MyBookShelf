import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CrudComponent } from './crud.component';
import { BookData } from 'src/app/models/bookData';
import { AngularFireService } from 'src/services/angular-fire.service';
import { AppModule } from 'src/app/app.module';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  let angularFireServiceSpy: jasmine.SpyObj<AngularFireService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockData: BookData = {
    Author: 'John Doe',
    Category: 'Fiction',
    Title: 'Sample Title',
    isbn: '1234567890',
    pages: 200,
    year_read: 2022,
    img_url: 'sample.jpg',
  } as BookData;

  beforeEach(waitForAsync(() => {
    angularFireServiceSpy = jasmine.createSpyObj('AngularFireService', ['deleteBookData']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['closeAll']);

    TestBed.configureTestingModule({
      declarations: [CrudComponent],
      imports: [ReactiveFormsModule,AppModule],
      providers: [
        FormBuilder,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AngularFireService, useValue: angularFireServiceSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with provided data', () => {
    expect(component.form.value).toEqual(mockData);
  });

  it('should call onDelete method and close the dialog', () => {
    component.onDelete('sampleId');

    expect(angularFireServiceSpy.deleteBookData).toHaveBeenCalledWith('sampleId');
    expect(matDialogSpy.closeAll).toHaveBeenCalled();
  });
});
