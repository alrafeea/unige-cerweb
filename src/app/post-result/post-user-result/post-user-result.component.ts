import { Color } from 'ng2-charts';
import { FactCheckerTags } from './../../models/fact-checker-tags';
import { ReliabilityTypes } from './../../models/reliability-types';
import { Hashtag } from './../../validate/user-validate/user-valdiate.component';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../models/post';
import { tap } from 'rxjs/operators';
import { RatingType } from '../../models/rating-type';
import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-user-result',
  templateUrl: './post-user-result.component.html',
  styleUrls: ['./post-user-result.component.scss']
})
export class PostUserResultComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  types: RatingType[];
  mostChosenType: any;
  userRatingCounters: any;
  percentage: number;
  loading = true;
  postId: string;
  source: string;
  postLink: string;
  subs = new SubSink();

  htgs: any[];
  reliabilityTypes: any[];
  fct: any[];
  reliabilityTypePerc: number;
 
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute,
  ) {
    this.subs.add(
      route.queryParams.subscribe((params) => {
        this.postLink = params.link;
      })
    );
  }
  ngOnInit() {
    this.subs.add(
      this.route.params.subscribe(params => {
        this.postId = params.postId + '';
        this.source = params.source + '';
        this.postService.initPost(this.postId, this.source, this.postLink);
        if (this.postService.post) {
          this.post$ = this.postService.getPost().pipe(
            tap(post => {
              if (post) {
                this.subs.add(
                  this.postService.getPostUsereview().subscribe(userPost => {
                    this.loading = false;
                    if (userPost.length > 0) {
                      this.htgs = this.filterArr(userPost.map(a => a.hashtags), 'displayName');
                      this.fct = this.filterArr(userPost.map(a => a.factCheckerTags).sort((n1, n2) => n2.name - n1.name), 'name');
                      // this.reliabilityTypes = this.filterArr(userPost.map(a => a.reliabilityType), 'name');
                      this.reliabilityTypePerc = this.calcReliabilityTypePerc(this.filterArr(userPost.map(a => a.reliabilityType), 'name'));
                    }
                  })
                );
              }
            })
          );
        }
      })
    );
  }
  // flat the array remove dublicate and return the count based on key
  private filterArr(arr: any[], key: string) {
    const data = Array.prototype.concat.apply([], arr);
    const tmp = data.reduce((result, current) => {
      if (!result[current[key]]) {
        result[current[key]] = 1;
      } else {
        result[current[key]] += 1;
      }
      // debugger;
      return result;
    }, {});
    return Object.keys(tmp).map(k => {
      return ({ name: k, count: tmp[k], color: this.gethashtagColor(parseInt(tmp[k])) });
    }).sort((n1, n2) => n2.count - n1.count);
  }
  private calcReliabilityTypePerc(reliabilityType: any[]) {
    const total = reliabilityType.reduce((acc, obj) => acc + obj.count, 0);
    const sum = reliabilityType.map(x => (x.name === 'Reliable' ? 100 : x.name === 'Unreliable' ? 0 : 50) * x.count)
      .reduce((acc, obj) => acc + obj, 0);
    return sum / total;
  }
  private gethashtagColor(count: number) {
    let color = '#f3e5f5';
    if (count === 1) {
      color = '#f3e5f5';
    }
    else if (count > 1 && count <= 10) {
      color = '#e1bee7';
    } else
      if (count > 10 && count <= 20) {
        color = '#ce93d8';
      } else
        if (count > 20 && count <= 30) {
          color = '#ba68c8';
        } else
          if (count > 30 && count <= 40) {
            color = '#ab47bc';
          } else {
            color = '#9c27b0';
          }
    return color;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
export interface Res {
  name: string;
  displayName: string;
}
