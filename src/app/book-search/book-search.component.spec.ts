import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AngularFireService } from 'src/services/angular-fire.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BookSearchComponent } from './book-search.component';
import { BookData } from '../models/bookData';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let mockAngularFireService: jasmine.SpyObj<AngularFireService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockAngularFireAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    mockAngularFireService = jasmine.createSpyObj('AngularFireService', ['getAllBooks', 'updateSingleBookData', 'getSingleBookDataByID']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);
    mockAngularFireAuth = jasmine.createSpyObj('AngularFireAuth', ['authState']);

    TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AngularFireService, useValue: mockAngularFireService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        FormBuilder,
      ],
    });
    (mockAngularFireAuth.authState as any) = of(true);
    mockAngularFireService.updateSingleBookData.and.returnValue(Promise.resolve());
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

// ... Inside the describe block

it('should call onSearch method and update bookData$', () => {
  const mockBookData: BookData[] = [
    { Title: 'Book 1', Category: 'Fiction', year_read: 2022, pages: 200, Author: 'a', Loan: false, ReadingNow: true, isbn: '123', Owned: true },
    { Title: 'Book 2', Category: 'Non Fiction', year_read: 2022, pages: 150, Author: 'b', Loan: false, ReadingNow: true, isbn: '1234', Owned: true }
  ];
  mockAngularFireService.getAllBooks.and.returnValue(of(mockBookData));
  component.form.controls.searchTerm.setValue('Book 1');
  component.onSearch();
  component.bookData$.subscribe((value) => {
    expect(value.result?.length).toEqual(mockBookData.length - 1);
    expect(value.isProcessing).toBeFalsy();
  });
});

it('should call onEditBook method and open the dialog', () => {
  const mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
  mockMatDialogRef.afterClosed.and.returnValue(of(true));
  const mockBookData: BookData[] = [
    { Title: 'Book 1', Category: 'Fiction', year_read: 2022, pages: 200, Author: 'a', Loan: false, ReadingNow: true, isbn: '123', Owned: true },
    { Title: 'Book 2', Category: 'Non Fiction', year_read: 2022, pages: 150, Author: 'b', Loan: false, ReadingNow: true, isbn: '1234', Owned: true }
  ];
  mockAngularFireService.getSingleBookDataByID.and.returnValue(of(mockBookData[0]));
  mockMatDialog.open.and.returnValue(mockMatDialogRef);
  component.onEditBook(mockBookData[0]);
  expect(mockAngularFireService.getSingleBookDataByID).toHaveBeenCalledWith(mockBookData[0].docId!);
});

afterEach(() => {
  fixture.destroy();
  });
});
