import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription, Observable, of } from 'rxjs';
import { RatingType } from '../../models/rating-type';
import { Post } from '../../models/post';
import { SubSink } from 'subsink';
import { ReliabilityTypes } from '../../models/reliability-types';
import { FactCheckerTags } from './../../models/fact-checker-tags';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Hashtag {
  name: string;
  displayName: string;
}
@Component({
  selector: 'app-user-validate',
  templateUrl: './user-validate.component.html',
  styleUrls: ['./user-validate.component.scss'],
})
export class UserValidateComponent implements OnInit, OnDestroy {
  postId: string;
  source: string;
  postLink: string;
  sub = new Subscription();
  // types$: Observable<RatingType[]>;
  reliabilityTypes: ReliabilityTypes[];
  factCheckerTags: FactCheckerTags[];
  selectedfactCheckerTags: FactCheckerTags[] = [];
  hashtags: Hashtag[] = [];
  post: Post;
  // userClaims: string[] = [];
  // localClaims: string[] = [];
  submitted = false;
  validateForm: FormGroup;
  subs = new SubSink();
  alreadyValidated: boolean;
  loading: boolean;
  user: any;
  // Hashtags
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  addOnBlur = true;


  constructor(
    private route: ActivatedRoute,
    private postsSerive: PostsService,
    private fb: FormBuilder,
    public auth: AuthService
  ) {
    this.subs.add(
      route.queryParams.subscribe((params) => {
        this.postLink = params.link;
      })
    );
    this.subs.add(
      this.route.params.subscribe((params) => {
        this.postId = params.postId + '';
        this.source = params.source + '';
        this.postsSerive.initPost(this.postId, this.source, this.postLink);
        this.post = this.postsSerive.post;
      })
    );
  }

  async ngOnInit() {
    this.loading = true;
    this.subs.add(
      this.auth.user$.subscribe((user) => {
        this.user = user;
        this.formUser.setValue(user);
      })
    );

    // this.types$ = this.postsSerive.getRatingTypes();
    // this.reliabilityTypes$ = this.postsSerive.getReliabilityTypes();
    this.postsSerive.getReliabilityTypes().subscribe(res => {this.reliabilityTypes = res; });
    this.postsSerive.getFactCheckerTags().subscribe(res => {this.factCheckerTags = res; });
    this.postsSerive.didUserValidateThisPost().subscribe(
      (validated) => {
        this.alreadyValidated = validated;
        this.loading = false;
      },
      (error) => (this.loading = false)
    );

    this.validateForm = this.fb.group({
      // type: new FormControl(null, Validators.required),
      reliabilityTypes: new FormControl(this.reliabilityTypes, Validators.required),
      hashtags: [[], [Validators.required]], // ['',[Validators.required]],
      factCheckerTags: [[], [Validators.required]],
      // this.fb.array([this.fb.group(new FactCheckerTags()), this.fb.group(new FactCheckerTags())]),
      // isTitleMisLeading: new FormControl(),
      // claims: new FormArray([]),
      post: new FormControl(this.post, Validators.required),
      user: new FormControl(this.user, Validators.required),
    });
  }
  // chooseRating(rating: RatingType) {
  //   this.type.setValue(rating);
  // }
  chooseReliablity(event) {
    const sname = (event.source.triggerValue || '').trim();
    const sid = (event.value || '').trim();
    const reliabilityType: ReliabilityTypes = this.reliabilityTypes.filter(x => x.id === event.value)[0];
     // {name: sname, id: sid, color:''};
    this.reliabilityTypesform.setValue(reliabilityType);
  }
  // addClaim() {
  //   this.claims.push(
  //     this.fb.group({
  //       claim: new FormControl(''),
  //     })
  //   );
  // }

  // removeClaim(index) {
  //   this.claims.removeAt(index);
  // }

  submitValidation() {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.submitted = true;
      this.postsSerive
        .vaidatePost(this.validateForm.value)
        .then((result) => {
          this.submitted = true;
        })
        .catch((error) => console.log(error));
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //#region Getters
  get reliabilityTypesform() {
    return this.validateForm.get('reliabilityTypes');
  }
  get HashtagForm() {
    return this.validateForm.get('hashtags');
  }
  get FactCheckerTagsForm() {
    return this.validateForm.get('factCheckerTags');
  }
  get type() {
    return this.validateForm.get('type');
  }

  // get email() {
  //   return this.validateForm.get('email');
  // }

  // get claims(): FormArray {
  //   return this.validateForm.get('claims') as FormArray;
  // }

  // get isTitleMisleading() {
  //   return this.validateForm.get('isTitleMisLeading');
  // }

  get formUser() {
    return this.validateForm.get('user');
  }
  //#endregion

  addHashtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.hashtags.push({name: value, displayName: '#' + value});
      this.HashtagForm.setValue(this.hashtags);
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
     }
  }

  removeHashtag(hashtag: Hashtag): void {
    const index = this.hashtags.indexOf(hashtag);

    if (index >= 0) {
      this.hashtags.splice(index, 1);
      this.HashtagForm.setValue(this.hashtags);
    }
  }

  addSelectedfactCheckerTag(event): void {
    const sname = (event.source.triggerValue || '').trim();
    const sid = (event.value || '').trim();

    // Add tag
    if (sid) {
      const sfc: FactCheckerTags = {name: sname, id: sid};
      const index = this.selectedfactCheckerTags.filter(x => x.id === sid);
      if (index.length === 0) {
        this.selectedfactCheckerTags.push(sfc);
        this.FactCheckerTagsForm.setValue(this.selectedfactCheckerTags);
        // this.FactCheckerTagsForm.push(
        //       this.fb.group({
        //        factCheckerTags: new FormControl(sfc),
        //       })
        //      );
      }
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
     }
  }

  removeSelectedfactCheckerTag(selectedfactCheckerTag: FactCheckerTags): void {
    const index = this.selectedfactCheckerTags.indexOf(selectedfactCheckerTag);

    if (index >= 0) {
      this.selectedfactCheckerTags.splice(index, 1);
      this.FactCheckerTagsForm.setValue(this.selectedfactCheckerTags);
    }
  }
}
