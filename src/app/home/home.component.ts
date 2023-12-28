import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Observable, Subscription } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  menu$: Observable<MenuItem[]>;
  postId: string;
  source: string;
  sub = new Subscription();
  subs = new SubSink();
  postLink: string;
  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
    this.subs.add(
      route.queryParams.subscribe((params) => {
        this.postLink = params.postLink;
      })
    );
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.postId = params['postId'] + '';
      this.source = params['source'] + '';
      this.postService.initPost(this.postId, this.source, this.postLink);
    });
    this.menu$ = this.menuService.getMenu();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
