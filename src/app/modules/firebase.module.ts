import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFirePerformanceModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [],
  providers: []
})
export class FirebaseModule {}
