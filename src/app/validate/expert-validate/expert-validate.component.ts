import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { RatingType } from '../../models/rating-type';
import { Post } from '../../models/post';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { AuthService } from '../../services/auth.service';
import { tap, finalize } from 'rxjs/operators';
import { ReliabilityTypes } from 'src/app/models/reliability-types';
import { FactCheckerTags } from 'src/app/models/fact-checker-tags';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
export interface Hashtag {
  name: string;
  displayName: string;
}
export interface Topic {
  name: string;
}

@Component({
  selector: 'app-expert-validate',
  templateUrl: './expert-validate.component.html',
  styleUrls: ['./expert-validate.component.scss'],
})
export class ExpertValidateComponent implements OnInit, OnDestroy {
  postId: string;
  sub = new Subscription();
  // types$: Observable<RatingType[]>;
  reliabilityTypes: ReliabilityTypes[];
  factCheckerTags: FactCheckerTags[];
  selectedfactCheckerTags: FactCheckerTags[] = [];
  hashtags: Hashtag[] = [];
  topics: Topic[] = [];
  post: Post;
  userClaims: string[] = [];
  localClaims: string[] = [];
  submitted = false;
  validateForm: FormGroup;
  subs = new SubSink();
  alreadyValidated: boolean;
  postLink: string;
  user: any;
  loading = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  addOnBlur = true;
  // isAnonymousValidator = false;
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

        this.postsSerive.initPost(
          this.postId,
          params.source + '',
          this.postLink
        );
        this.post = this.postsSerive.post;
      })
    );
  }

  async ngOnInit() {
    this.subs.add(
      this.auth.user$.subscribe((user) => {
        this.user = user;
        this.formUser.setValue(user);
      })
    );
    // this.types$ = this.postsSerive.getRatingTypes();
    this.postsSerive.getReliabilityTypes().subscribe(res => {this.reliabilityTypes = res; });
    this.postsSerive.getFactCheckerTags().subscribe(res => {this.factCheckerTags = res; });
    this.loading = true;
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
      topics: [[], [Validators.required]], // ['',[Validators.required]],
      factCheckerTags: [[], [Validators.required]],
      // isTitleMisLeading: new FormControl(),
      references: new FormArray([]),
      questionsAndAnswers: new FormArray([]),
      post: new FormControl(this.post, Validators.required),
      summary: new FormControl(''),
      context: new FormControl(''),
      analysis: new FormControl(''),
      user: new FormControl(this.user, Validators.required),
      isAnonymousValidator: false
    });

    this.addReferences();
  }

  // chooseRating(rating: RatingType) {
  //   this.type.setValue(rating);
  // }

  addReferences() {
    this.references.push(
      this.fb.group({
        references: new FormControl(''),
      })
    );
  }

  removeReferences(index) {
    this.references.removeAt(index);
  }

  addQuestionAndAnswer() {
    this.questionsAndAnswers.push(
      this.fb.group({
        question: new FormControl(''),
        answer: new FormControl('')
      })
    );
  }

  removeQuestionAndAnswer(index) {
    this.questionsAndAnswers.removeAt(index);
  }


  submitValidation() {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.submitted = true;
      this.postsSerive
        .vaidatePostAsExpert(this.validateForm.value)
        .then((result) => {
          this.submitted = true;
        })
        .catch((error) => console.log(error));
    }
  }
  chooseReliablity(event) {
    const sname = (event.source.triggerValue || '').trim();
    const sid = (event.value || '').trim();
    const reliabilityType: ReliabilityTypes = this.reliabilityTypes.filter(x => x.id === event.value)[0];
     // {name: sname, id: sid, color:''};
    this.reliabilityTypesform.setValue(reliabilityType);
  }
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
  addTopic(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.topics.push({name: value});
      this.TopicForm.setValue(this.topics);
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
     }
  }

  removeTopic(topic: Topic): void {
    const index = this.topics.indexOf(topic);

    if (index >= 0) {
      this.topics.splice(index, 1);
      this.TopicForm.setValue(this.topics);
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //#region Getters

  // get type() {
  //   return this.validateForm.get('type');
  // }

  get email() {
    return this.validateForm.get('email');
  }

  get references(): FormArray {
    return this.validateForm.get('references') as FormArray;
  }
  get questionsAndAnswers(): FormArray {
    return this.validateForm.get('questionsAndAnswers') as FormArray;
  }

  get isTitleMisLeading() {
    return this.validateForm.get('isTitleMisLeading');
  }

  get whatIsTrue() {
    return this.validateForm.get('whatIsTrue');
  }
  get whatIsFalse() {
    return this.validateForm.get('whatIsFalse');
  }

  get formUser() {
    return this.validateForm.get('user');
  }
  get reliabilityTypesform() {
    return this.validateForm.get('reliabilityTypes');
  }
  get HashtagForm() {
    return this.validateForm.get('hashtags');
  }
  get TopicForm() {
    return this.validateForm.get('topics');
  }
  get FactCheckerTagsForm() {
    return this.validateForm.get('factCheckerTags');
  }

  //#endregion
}
