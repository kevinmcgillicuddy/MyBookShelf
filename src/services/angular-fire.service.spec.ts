import { TestBed } from '@angular/core/testing';
import { AngularFireService } from './angular-fire.service';
import { AngularFirestore, AngularFirestoreModule, USE_EMULATOR } from '@angular/fire/compat/firestore';
import { BookData } from 'src/app/models/bookData';
import { Store } from '@ngxs/store';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';


describe('AngularFireService', () => {
  let service: AngularFireService;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule],
      providers: [
        { provide: Store, useValue: Store },
        { provide: AngularFirestore, useValue: { provide: USE_EMULATOR, useValue: ['localhost', 8080] }, },
      ],
    });
    service = TestBed.inject(AngularFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
