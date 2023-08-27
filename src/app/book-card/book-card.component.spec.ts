import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a loading array length of 6', () => {
    expect(component.loadingArray.length).toEqual(6);
  });

  it('should display books',()=>{
    component.books = [];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('bookWrapper'))).toBeTruthy();
  })

  it('should display loader',()=>{
    expect(fixture.debugElement.query(By.css('loading-container'))).toBeTruthy();
  })

});
