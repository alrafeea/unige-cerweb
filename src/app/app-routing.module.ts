import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ValidateComponent } from './validate/validate.component';
import { PostResultComponent } from './post-result/post-result.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginByEmailComponent } from './login-by-email/login-by-email.component';
import { SignUpByEmailComponent } from './signup-by-email/signup-by-email.component';
import { ResetPasswordComponent } from './reset-passworrd/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginByEmailComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'signup',
    component: SignUpByEmailComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'home/:postId/:source',
    component: HomeComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'validate/:postId/:source',
    component: ValidateComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'result/:postId/:source',
    component: PostResultComponent,
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
