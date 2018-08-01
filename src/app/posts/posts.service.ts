import { Injectable } from '../../../node_modules/@angular/core';

import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: String, posts: any}>('http://localhost:3000/api/posts')
    .pipe( map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          text: post.text,
          id: post._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostsUpdated() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, text: string) {
    const post: Post = {id: null, title: title, text: text};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
