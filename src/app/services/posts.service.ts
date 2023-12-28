import { FactCheckerTags } from './../models/fact-checker-tags';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { RatingType } from '../models/rating-type';
import { Post } from '../models/post';
import { ValidateCommand } from '../commands/validate-command';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { ExpertReview } from '../models/expert-review';
import { HelperService } from './helper.service';
import { ReliabilityTypes } from '../models/reliability-types';

@Injectable({ providedIn: 'root' })
export class PostsService {
  public post: Post;
  constructor(
    private db: DbService,
    private afs: AngularFirestore,
    private auth: AuthService
  ) { }

  initPost(postId: string, postSource: string, sourceLink: string) {
    this.post = {
      id: HelperService.encryptStringByAES(sourceLink),
      source: postSource,
      link: sourceLink,
      url: sourceLink
    };

  }
  getRatingTypes(): Observable<RatingType[]> {
    return this.db.collection$(`/post-rating-types`).pipe(
      map(result => {
        return RatingType.fromEntityListResult(result);
      }),
      shareReplay()
    );
  }
  getReliabilityTypes(): Observable<ReliabilityTypes[]> {
    return this.db.collection$(`/post-reliability-types`).pipe(
      map(result => {
        return ReliabilityTypes.fromEntityListResult(result);
      }),
      shareReplay()
    );
  }
  getFactCheckerTags(): Observable<FactCheckerTags[]> {
    return this.db.collection$(`/post-fact-checker-tags`).pipe(
      map(result => {
        return FactCheckerTags.fromEntityListResult(result);
      }),
      shareReplay()
    );
  }
  getPost(): Observable<Post> {
    return this.db
      .doc$(`posts/${this.post.id}`)
      .pipe(map(p => Post.fromEntityResult(p)));
  }

  getPostExpertReview(): Observable<ExpertReview[]> {
    return this.db
      .collection$(`posts/${this.post.id}/expert-reviews`)
      .pipe(map(revs => ExpertReview.fromEntityListResult(revs)));
  }
  // TODO: Add user review model
  getPostUsereview(): Observable<any[]> {
    return this.db
      .collection$(`posts/${this.post.id}/user-reviews`)
      .pipe(map(revs => {
        const result: any[] = [];
        if (revs && revs.length) {
          revs.forEach((ele: any ) => {
            const rev: any = {
              id: ele.id,
              createdAt: ele.createdAt
                ? new Date(ele.createdAt.seconds * 1000)
                : new Date(),
              factCheckerTags: ele.factCheckerTags,
              hashtags: ele.hashtags,
              reliabilityType: ele.reliabilityType,
            };
            result.push(rev);
          });
        }
        return result;
      }));
  }

  didUserValidateThisPost(): Observable<boolean> {
    const postId = HelperService.encryptStringByAES(this.post.url);
    return this.auth.user$.pipe(
      switchMap((user: any) => {
        if (user != null) {
          if (user.roles.expert === true) {
            return this.db
              .collection$(`posts/${postId}/expert-reviews`, ref =>
                ref.where('user.uid', '==', user.id)
              )
              .pipe(
                map(revs => {
                  return revs != null && revs.length > 0;
                })
              );
          } else {
            return this.db
              .collection$(`posts/${postId}/user-reviews`, ref =>
                ref.where('user.uid', '==', user.id)
              )
              .pipe(
                map(revs => {
                  return revs != null && revs.length > 0;
                })
              );
          }
        } else {
          return of(false);
        }
      })
    );
  }

  async vaidatePost(form: any) {
    const batch = this.afs.firestore.batch();
    const user = await this.auth.user();

    try {

      const postId = HelperService.encryptStringByAES(form.post.url);
      const postRef = this.afs.firestore.doc(`posts/${postId}`);
      const doc = await postRef.get();
      if (!doc.exists) {
        batch.set(
          postRef,
          {
            counters: {
              usersValidations: firebase.firestore.FieldValue.increment(1)
            },
            source: form.post.source,
            link: form.post.link,
            url: form.post.url,
            id: postId,
            createdAt: firebase.firestore.Timestamp.now(),
            userRatingCounter: {
              [`${form.reliabilityTypes.id}`]: firebase.firestore.FieldValue.increment(1)
            }
          },
          { merge: true }
        );

        this.addMyNewsInfoToUser({ postId });

      } else {
        batch.set(
          postRef,
          {
            counters: {
              usersValidations: firebase.firestore.FieldValue.increment(1)
            },
            userRatingCounter: {
              [`${form.reliabilityTypes.id}`]: firebase.firestore.FieldValue.increment(1)
            }
          },
          { merge: true }
        );
        this.addMyNewsInfoToUser({ postId, addToMyNews: false });
      }

      const reviewRef = this.afs.firestore.doc(
        `posts/${postId}/user-reviews/${this.afs.createId()}`
      );
      batch.set(reviewRef, ValidateCommand.fromForm(form, user, postId, reviewRef.id));
      return batch.commit();
    } catch (error) {
      console.log('error');
      return null;
    }
  }
  async addMyNewsInfoToUser({ postId, addToValidationNews = true, addToMyNews = true }) {
    const user = await this.auth.user();
    let localValidation = user.addMyValidatedNews;
    let localMyNews = user.myNews;

    if ((!user.myValidatedNews || user.myValidatedNews.length === 0) && addToValidationNews) {
      localValidation = [postId];

    }
    if (user.myValidatedNews && addToValidationNews) {
      localValidation = [...user.myValidatedNews, postId];
    }

    if ((!user.myNews || user.myNews.length === 0) && addToMyNews) {
      localMyNews = [postId];

    }
    if (user.myNews && addToMyNews) {
      localMyNews = [...user.myNews, postId];
    }
    this.auth.updateUserData({
      uid: user.uid,
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      photoURL: '',
      isAnonymous: false,
      myValidatedNews: localValidation,
      myNews: localMyNews,
      createdAt: user.createdAt,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      country: user.country
    });
  }

  async vaidatePostAsExpert(form: any) {
    const batch = this.afs.firestore.batch();
    const user = await this.auth.user();

    const expertProfile = user.expert;

    try {
      const postId = HelperService.encryptStringByAES(form.post.url);
      const postRef = this.afs.firestore.doc(`posts/${postId}`);
      const doc = await postRef.get();
      if (!doc.exists) {
        batch.set(
          postRef,
          {
            counters: {
              expertsValidations: firebase.firestore.FieldValue.increment(1)
            },
            source: form.post.source,
            link: form.post.link,
            url: form.post.url,
            id: postId,
            createdAt: firebase.firestore.Timestamp.now(),
            expertRatingCounter: {
              [`${form.reliabilityTypes.id}`]: firebase.firestore.FieldValue.increment(1)
            }
          },
          { merge: true }
        );
        this.addMyNewsInfoToUser({ postId });

      } else {
        batch.set(
          postRef,
          {
            counters: {
              expertsValidations: firebase.firestore.FieldValue.increment(1)
            },
            expertRatingCounter: {
              [`${form.reliabilityTypes.id}`]: firebase.firestore.FieldValue.increment(1)
            }
          },
          { merge: true }
        );

        this.addMyNewsInfoToUser({ postId, addToMyNews: false });

      }

      const reviewRef = this.afs.firestore.doc(
        `posts/${postId}/expert-reviews/${this.afs.createId()}`
      );
      batch.set(
        reviewRef,
        ValidateCommand.fromExpertForm(form, user, expertProfile, postId, reviewRef.id)
      );
      return batch.commit();
    } catch (error) {
      return null;
    }
  }
}
