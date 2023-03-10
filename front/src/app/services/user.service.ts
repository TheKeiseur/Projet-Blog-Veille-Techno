import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {environment} from "../../environments/environment";
import {PostCard} from "./Post";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${id}`);
  }

  getRandomUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/random-user`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/user/create`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.baseUrl}/user`, user);
  }

  deleteUserById(id: string) {
    return this.http.delete(`${environment.baseUrl}/user/${id}`);
  }

  getFavoredPosts(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(`${environment.baseUrl}/user/favored-posts/posts`);
  }

}
