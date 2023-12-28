import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SubSink} from 'subsink';
import {PostsService} from '../services/posts.service';

@Component({
  selector: 'app-post-result',
  templateUrl: './post-result.component.html',
  styleUrls: ['./post-result.component.scss']
})
export class PostResultComponent implements OnInit {
  postLink: string;
  subs = new SubSink();
  constructor(
    private route: ActivatedRoute
  ) {
    this.subs.add(
      route.queryParams.subscribe((params) => {
        this.postLink = params.link;
      })
    );
  }

  ngOnInit() {
  }

}
