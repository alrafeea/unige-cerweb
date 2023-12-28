import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';
import { MatDialogRef } from '@angular/material';
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading = true;
  user: any;
  subs = new SubSink();
  post: Post;
  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>,

  ) {}

  ngOnInit() {

  }

  doLogin(loginType: Promise<void>) {
    loginType.then(result => {
      this.dialogRef.close(this.auth.user$);
    });
  }



  checkuserData(): void {
    this.auth.user$.subscribe(user => {
      this.loading = false;
      this.user = user;
      if (!user) {
        return;
      }
    });
  }

    ngOnDestroy() {
      this.subs.unsubscribe();
    }
}
