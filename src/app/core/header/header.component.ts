import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router , NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any;
  userSub: Subscription;
  loading = true;
  private history: string[] = [];

  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });

  }

  ngOnInit() {
    this.checkuserData();
  }

  checkuserData(): void {
    this.userSub = this.auth.user$.subscribe(user => {
      this.user = user;
      this.loading = false;
      if (!user) {
        return;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onClickSignOut() {
    this.auth.logOut();
    this.checkuserData();
    this.router.navigate(['/login']);

  }
  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
