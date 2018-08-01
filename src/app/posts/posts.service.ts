import { Injectable } from '../../../node_modules/@angular/core';

import { Subject } from 'rxjs';
import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsUpdated() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: String, text: String) {
    const post: Post = {title, text};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
