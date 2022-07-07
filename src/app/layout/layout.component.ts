import { FooService } from './../services/foo.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { Subscription, Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

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
    /*
    this.postSubscription = this.fooService.getPosts().subscribe(posts => {
      this.posts = posts;
    });

    this.commentSubscription = this.fooService.getComments().subscribe(comments => {
      this.comments = comments;
    });
    */

    forkJoin([this.fooService.getPosts(),this.fooService.getComments()]).subscribe((results) => {
      this.posts = results[0];
      this.comments = results[1];
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
