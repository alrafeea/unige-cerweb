import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { tap, map, switchMap } from 'rxjs/operators';
import { AppLoaderService } from '../services/app-loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private loader: AppLoaderService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    this.loader.open()
    return this.authService.user$.pipe(
      tap(user => {


        if (user == null) {
          this.router.navigateByUrl('login');
        //   let dialogRef: MatDialogRef<LoginComponent>;
        //   dialogRef = this.dialog.open(LoginComponent, {
        //     width: '380px',
        //     disableClose: true,
        //     panelClass: 'login-dialog'
        //   });
        //   dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //       this.router.navigateByUrl(state.url);
        //     } else {
        //     }
        //   });
        }
        localStorage.setItem('redirectTo', state.url);
        this.loader.close()
      }),
      map(user => {
        return user != null;
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
