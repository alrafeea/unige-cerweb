import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { SubSink } from 'subsink';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { ExpertReview } from '../../models/expert-review';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import {MatAccordion} from '@angular/material/expansion';
@Component({
  selector: 'app-post-expert-result',
  templateUrl: './post-expert-result.component.html',
  styleUrls: ['./post-expert-result.component.scss'],
})
export class PostExpertResultComponent implements OnInit {
  post$: Observable<Post>;

  @ViewChild('stepsCarousel', { static: false })
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  stepsCarousel: NguCarousel<any>;
  loading = true;
  postId: string;
  source: string;
  reviews$: Observable<ExpertReview[]>;
  postLink: string;
  subs = new SubSink();
  public carouselBanner: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    point: {
      visible: false,
    },
    loop: true,
    touch: true,

    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  };
  leftNavDisabled = true;
  rightNavDisabled = false;
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.subs.add(
      route.queryParams.subscribe((params) => {
       this.postLink = params.link;
      })
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = params.postId + '';
      this.source = params.source + '';
      this.postService.initPost(this.postId, this.source, this.postLink);

      if (this.postService.post) {
        this.post$ = this.postService.getPost();
        this.reviews$ = this.postService.getPostExpertReview();
        this.postService.getPostExpertReview().subscribe(x => { console.log(x); });
      }
    });
  }

  async onCarouselMove(isFirst, isLast) {
    // setTimeout(() => {console.log(isFirst)}, 1000);
    if (isFirst) {
      this.leftNavDisabled = true;
    } else {
      this.leftNavDisabled = false;
    }
    if (isLast) {
      this.rightNavDisabled = true;
    } else {
      this.rightNavDisabled = false;
    }
  }
}
