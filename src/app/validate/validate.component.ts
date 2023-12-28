import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RatingType } from '../models/rating-type';
import { PostsService } from '../services/posts.service';
import { SubSink } from 'subsink';
import { Post } from '../models/post';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent implements OnInit, OnDestroy {
  postId: string;
  sub = new Subscription();
  types$: Observable<RatingType[]>;
  post: Post;
  userClaims: string[] = [];
  localClaims: string[] = [];
  submitted = false;
  loading;
  subs = new SubSink();
  isExpert: boolean;
  user: any;
  waitFirUser = false;
  validateForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private postsSerive: PostsService,
    private fb: FormBuilder,
    private helperService: HelperService,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    HelperService.encryptStringByAES('');
    this.loading = true;
    this.subs.add(
      this.auth.isExpert$.subscribe(
        (expert) => {
          this.isExpert = expert;
          console.log('Exper:');
          console.log(this.isExpert);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      )
    );
    try {
      this.waitFirUser = true;
      this.user = await this.auth.user;
      this.waitFirUser = false;
    } catch (error) {
      this.waitFirUser = false;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
