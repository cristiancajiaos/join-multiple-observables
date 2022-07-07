import { FooService } from './../services/foo.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  posts: Post[] = [];
  comments: Comment[] = [];

  private postSubscription: Subscription;
  private commentSubscription: Subscription;

  constructor(
    private fooService: FooService
  ) { }

  ngOnInit(): void {
    this.postSubscription = this.fooService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

    this.commentSubscription = this.fooService.getComments().subscribe(comments => {
      this.comments = comments;
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

}
