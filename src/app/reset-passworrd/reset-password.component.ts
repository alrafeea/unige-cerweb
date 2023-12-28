import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'
import * as $ from "jquery";

import 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetEmailSent = false;
  errorMessage='';
  loading = false;
  constructor(private fb: FormBuilder,     private router: Router,
    private authService: AuthService
    ) { }

  async ngOnInit() {
    $("app-header").hide();
    this.resetPasswordForm = this.fb.group({
      email: new FormControl('', Validators.required)
    });

      }

  async resetPassword () {
    const auth = firebase.auth()
    try {
    this.loading = true;
     const result = await auth.sendPasswordResetEmail(this.resetPasswordForm.value.email);
     this.resetEmailSent = true;
     this.loading = false;
    }
    catch(e) {
      this.loading = false;
      this.errorMessage=e.message;
    }
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }


  get password() {
    return this.resetPasswordForm.get('password');
  }

  ngOnDestroy() {
    $("app-header").show();
  }

}

