import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import 'firebase/auth';
import { SubSink } from 'subsink';
import { Post } from '../models/post';
import { AuthService } from '../services/auth.service';
import * as $ from "jquery";

@Component({
  selector: 'app-login-by-email',
  templateUrl: './login-by-email.component.html',
  styleUrls: ['./login-by-email.component.scss']
})
export class LoginByEmailComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  loading = true;
  user: any;
  subs = new SubSink();
  post: Post;
  visibility = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    ) { }

  async ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngAfterViewInit(): void {
    $("app-header").hide();
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  async login () {
    // const auth = firebase.auth();
    const response = await this.authService.credentialsLogin(this.loginForm.value.email, this.loginForm.value.password);
    if(response.message) {
      this.errorMessage = response.message;
    } else {
      this.router.navigateByUrl(localStorage.getItem('redirectTo'));
    }
  }

  get email() {
    return this.loginForm.get('email');
  }


  get password() {
    return this.loginForm.get('password');
  }

  /* login using gmail */

  doLogin(loginType: Promise<void>) {
    loginType.then(result => {
      this.router.navigateByUrl(localStorage.getItem('redirectTo'));
      // this.dialogRef.close(this.authService.user$);
    }).catch(err => {
          });
  }

  checkuserData(): void {
    this.authService.user$.subscribe(user => {
      this.loading = false;
      this.user = user;
      if (!user) {
        return;
      }
    });
  }

  ngOnDestroy() {
    $("app-header").show();
    this.subs.unsubscribe();
  }
  
  onEnter(){
    if (this.loginForm.valid){
     this.login();
    }
  }
  
  
}

