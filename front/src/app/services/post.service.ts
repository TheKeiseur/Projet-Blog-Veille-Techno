import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LikeOrDislike, Post, PostCard, PostRequest} from "./Post";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getRecentPosts(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(`${environment.baseUrl}/posts`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.baseUrl}/post/${id}`);
  }

  createPost(postRequest: PostRequest): Observable<Post> {
    return this.http.post<Post>(`${environment.baseUrl}/post/create`, postRequest);
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.baseUrl}/post/${id}`);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${environment.baseUrl}/post`, post);
  }

  likeOrDislike(likeOrDislike: LikeOrDislike): Observable<Post> {
    return this.http.put<Post>(`${environment.baseUrl}/post/like`, likeOrDislike);
  }
}
