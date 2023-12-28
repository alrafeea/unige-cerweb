import { ReliabilityChartComponent } from './post-result/reliability-chart/reliability-chart.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/app.material.module';
import { HomeComponent } from './home/home.component';
import { FirebaseModule } from './modules/firebase.module';
import { ValidateComponent } from './validate/validate.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostUserResultComponent } from './post-result/post-user-result/post-user-result.component';
import { PostResultComponent } from './post-result/post-result.component';
import { PostExpertResultComponent } from './post-result/post-expert-result/post-expert-result.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { TypeCounterChartComponent } from './post-result/type-counter-chart/type-counter-chart.component';

import { AppLoaderComponent } from './shared/app-loader/app-loader.component';
import { LoginComponent } from './login/login.component';
import { UserSummaryComponent } from './shared/user-summary/user-summary.component';
import { ExpertValidateComponent } from './validate/expert-validate/expert-validate.component';
import { UserValidateComponent } from './validate/user-validate/user-valdiate.component';
import { FirebaseImageComponent } from './shared/firebase-image/firebase-image.component';
import { NguCarouselModule } from '@ngu/carousel';
import { LoginByEmailComponent } from './login-by-email/login-by-email.component';
import { SignUpByEmailComponent } from './signup-by-email/signup-by-email.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatSelectModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { ResetPasswordComponent } from './reset-passworrd/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmbededLoaderComponent } from './shared/embeded-loader/embeded-loader.component';
import { HeaderComponent } from './core/header/header.component';
import {MatChipsModule} from '@angular/material/chips';
import { Ng2GaugeModule } from 'ng2-gauge';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPrettyDateModule } from 'ngx-pretty-date';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ValidateComponent,
    PostUserResultComponent,
    PostResultComponent,
    PostExpertResultComponent,
    TypeCounterChartComponent,
    AppLoaderComponent,
    LoginComponent,
    UserSummaryComponent,
    ExpertValidateComponent,
    UserValidateComponent,
    FirebaseImageComponent,
    LoginByEmailComponent,
    SignUpByEmailComponent,
    ResetPasswordComponent,
    UserProfileComponent,
    EmbededLoaderComponent,
    HeaderComponent,
    ReliabilityChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FirebaseModule,
    FlexLayoutModule,
    ChartsModule,
    NguCarouselModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    Ng2GaugeModule,
    MatExpansionModule,
    NgxPrettyDateModule,
    MatToolbarModule,
    MatMenuModule

  ],
  providers: [ThemeService],
  bootstrap: [AppComponent],
  entryComponents: [AppLoaderComponent, LoginComponent]
})
export class AppModule {}
