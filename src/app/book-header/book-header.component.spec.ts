import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BookHeaderComponent } from './book-header.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireService } from 'src/services/angular-fire.service';
import { of } from 'rxjs';
import { CrudComponent } from '../admin/crud/crud.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookHeaderComponent', () => {
  let component: BookHeaderComponent;
  let fixture: ComponentFixture<BookHeaderComponent>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockAngularFireService: jasmine.SpyObj<AngularFireService>;

  beforeEach(() => {
    mockAuth = jasmine.createSpyObj('AngularFireAuth', ['authState', 'signOut']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open', 'close', 'afterClosed']);
    mockAngularFireService = jasmine.createSpyObj('AngularFireService', ['updateSingleBookData']);

    TestBed.configureTestingModule({
      schemas:[NO_ERRORS_SCHEMA],
      declarations: [BookHeaderComponent],
      providers: [
        { provide: AngularFireAuth, useValue: mockAuth },
        { provide: MatDialog, useValue: mockDialog },
        { provide: AngularFireService, useValue: mockAngularFireService },
      ],
    });
    (mockAuth.authState as any) = of(true);
    fixture = TestBed.createComponent(BookHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set authState$ to true when user is authenticated', () => {
    fixture.detectChanges();
    component.authState$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  it('should call signOut when logout is called', () => {
    component.logout();
    expect(mockAuth.signOut).toHaveBeenCalled();
  });

  it('should open the dialog when addBook is called', () => {
     const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    mockDialogRef.afterClosed.and.returnValue(of(undefined));
    mockDialog.open.and.returnValue(mockDialogRef);
  component.addBook();
    expect(mockDialog.open).toHaveBeenCalledWith(CrudComponent);
  });

  it('should update book data when dialog is closed with a result', () => {

    const mockBookData: any = {};
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    mockDialogRef.afterClosed.and.returnValue(of(mockBookData));
    mockDialog.open.and.returnValue(mockDialogRef);
    mockAngularFireService.updateSingleBookData.and.returnValue(Promise.resolve());
    component.addBook();
    expect(mockAngularFireService.updateSingleBookData).toHaveBeenCalledWith(mockBookData);
  });

  it('should not update book data when dialog is closed without a result', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    mockDialogRef.afterClosed.and.returnValue(of(undefined));
    mockDialog.open.and.returnValue(mockDialogRef);
    component.addBook();
    expect(mockAngularFireService.updateSingleBookData).not.toHaveBeenCalled();
  });

});
