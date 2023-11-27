import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookChartComponent } from './book-chart.component';
import { AngularFireService } from 'src/services/angular-fire.service';
import { of } from 'rxjs';
import { LegendPosition } from '@swimlane/ngx-charts';
import { BookData } from '../models/bookData';

describe('BookChartComponent', () => {
  let component: BookChartComponent;
  let fixture: ComponentFixture<BookChartComponent>;
  let mockAngularFireService: jasmine.SpyObj<AngularFireService>;

  beforeEach(() => {
    mockAngularFireService = jasmine.createSpyObj('AngularFireService', ['getAllBooks']);

    TestBed.configureTestingModule({
      declarations: [BookChartComponent],
      providers: [{ provide: AngularFireService, useValue: mockAngularFireService }],
    });

    fixture = TestBed.createComponent(BookChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties on ngOnInit', () => {
    const mockBooks: BookData[] = [
      { Title: 'Book 1', Category: 'Fiction', year_read: 2022, pages: 200, Author: 'a', Loan:false, ReadingNow: true, isbn:'123',Owned:true },
      { Title: 'Book 2', Category: 'Non Fiction', year_read: 2022, pages: 150, Author: 'b', Loan:false, ReadingNow: true, isbn:'1234',Owned:true },
    ];
    mockAngularFireService.getAllBooks.and.returnValue(of(mockBooks));
    component.ngOnInit();
    expect(component.legendPosition).toBe(LegendPosition.Below);

    expect(component.categoryBreakDown$?.value).toEqual([
      { name: 'Fiction', value: 1 },
      { name: 'Non Fiction', value: 1 },
    ]);

    expect(component.yearBreakDown$?.value).toEqual([
      { name: '2022', value: 2 },
    ]);

    expect(component.pagesPerYearBreakDown$?.value).toEqual([
      { name: 'Pages', series: [{ name: '2022', value: 350 }] },
    ]);

    expect(component.bookData$?.value).toEqual([
      { name: 'Total Books', value: 2 },
    ]);
  });

  it('should handle window resize event', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    component.onResize();
    expect(component.screenWidth).toBe(700);
  });

});
