import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AngularFireService } from 'src/services/angular-fire.service';
import { BookData } from '../models/bookData';
import { BookViewComponent } from './book-view.component';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;
  let mockAngularFireService: jasmine.SpyObj<AngularFireService>;
  const mockBookData: BookData[] = [
    { Title: 'Book 1', Category: 'Fiction', year_read: 2022, pages: 200, Author: 'a', Loan: false, ReadingNow: true, isbn: '123', Owned: true },
    { Title: 'Book 2', Category: 'Non Fiction', year_read: 2022, pages: 150, Author: 'b', Loan: false, ReadingNow: true, isbn: '1234', Owned: true }
  ];
  beforeEach(() => {
    mockAngularFireService = jasmine.createSpyObj('AngularFireService', ['getBookShelfData', 'getMoreShelfData']);

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [BookViewComponent],
      providers: [
        { provide: AngularFireService, useValue: mockAngularFireService },
      ],
    });
    mockAngularFireService.bookData$ = new BehaviorSubject<any>({result: mockBookData});
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBookShelfData on component creation', () => {
     fixture.detectChanges();
    expect(mockAngularFireService.getBookShelfData).toHaveBeenCalled();
  });

  it('should set booksData$ to the value from the service', fakeAsync(() => {

    fixture.detectChanges();
    tick();
    component.booksData$.subscribe((value) => {
      expect(value.result![0].isbn).toEqual(mockBookData[0].isbn);
    });
  }));

  it('should call getMoreShelfData on onScroll', () => {

    component.onScroll();

    expect(mockAngularFireService.getMoreShelfData).toHaveBeenCalled();
  });


  afterEach(() => {
    fixture.destroy();
  });
});
