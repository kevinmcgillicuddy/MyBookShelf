import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuth: jasmine.SpyObj<AngularFireAuth>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockError = new Error('Test error');

  beforeEach(waitForAsync(() => {
    mockAuth = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loginForm with required fields', () => {
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should validate the email field', () => {
    const emailControl = component.loginForm.get('email');

    emailControl!.setValue('invalidemail');
    expect(emailControl!.valid).toBeFalsy();

    emailControl!.setValue('validemail@example.com');
    expect(emailControl!.valid).toBeTruthy();
  });

  it('should validate the password field', () => {
    const passwordControl = component.loginForm.get('password');

    passwordControl!.setValue('');
    expect(passwordControl!.valid).toBeFalsy();

    passwordControl!.setValue('validpassword');
    expect(passwordControl!.valid).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword on login', fakeAsync(() => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });

    const fakeUser = {
      user: {
        uid: 'fakeUserId',
        email: 'test@example.com',
      },
    };

    mockAuth.signInWithEmailAndPassword.and.returnValue(Promise.resolve(fakeUser as any));
    component.login();
    tick();
    expect(mockAuth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    // Expect router.navigate to be called with the home route
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should handle login failure', fakeAsync(async () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    mockAuth.signInWithEmailAndPassword.and.returnValue(Promise.reject(mockError));
    component.login();
    tick();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    component.loginFailure$.subscribe({
      next: (error) => {
        expect(error).toBe(mockError);
      }
    });
  });
  }));

});
