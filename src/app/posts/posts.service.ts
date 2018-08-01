import { Injectable } from '../../../node_modules/@angular/core';

import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: String, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postsData) => {
      this.posts = postsData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostsUpdated() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: String, text: String) {
    const post: Post = {id: null, title: title, text: text};
    this.http.post<{message: String}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message );
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
