import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

  private destory$ = new BehaviorSubject<boolean>(false);
  constructor(private auth: AngularFireAuth, private formBuilder: FormBuilder, private router: Router) { }
  loginFailure$ = new BehaviorSubject<Error | undefined>(undefined);
  loginForm: FormGroup = this.formBuilder.group({
    email: [undefined, [Validators.required, Validators.email]],
    password: [undefined, Validators.required]
  });



  login(): void {
  this.auth.signInWithEmailAndPassword(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value).then((_) => {
    this.router.navigate(['/'])
  }).catch((error) => {
     this.loginFailure$.next(error)
  });

  };

  ngOnDestroy() {
    this.destory$.next(true);
    this.destory$.complete();
  }

}
