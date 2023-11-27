import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;

    component.books = [
      { Title: 'Book 1', Category: 'Fiction', year_read: 2022, pages: 200, Author: 'a', Loan: false, ReadingNow: true, isbn: '123', Owned: true },
      { Title: 'Book 2', Category: 'Non Fiction', year_read: 2022, pages: 150, Author: 'b', Loan: false, ReadingNow: true, isbn: '1234', Owned: true },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a loading array length of 6', () => {
    expect(component.loadingArray.length).toEqual(6);
  });

  it('should display books', () => {
    expect(fixture.debugElement.query(By.css('.bookWrapper'))).toBeTruthy()
  })

  it('should display loader', fakeAsync(() => {
    component.books = undefined;
    fixture.changeDetectorRef.detectChanges();
      fixture.detectChanges();
      tick();
    expect(fixture.debugElement.query(By.css('.loading-container'))).toBeTruthy();
  }))

  it('should set edit books', () => {
    component.showEdit = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.editButton'))).toBeTruthy();
  });

});
