import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LikeOrDislike, PostCard} from "../../services/Post";
import {PostService} from "../../services/post.service";
import {formatDate} from "../../utils/DateUtils";
import {AddToFavoredRequest} from "../../services/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input()
  postCard!: PostCard;
  isAdmin = false;
  isUserPost = false;
  hasBeenLiked = false;
  isFavoredPost = false;

  constructor(private postService: PostService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.isUserPost = this.authService.connectedUser?.id === this.postCard.author_id;
    this.isFavoredPost = this.authService.connectedUser!.favoredPosts.includes(this.postCard.id);
    console.log(this.isFavoredPost);
  }

  getFormattedDate(date: Date): string {
    return formatDate(date);
  }

  deleteCard(): void {
    this.postService.deletePost(this.postCard.id).subscribe(() => this.router.navigateByUrl('/home'));
  }

  likeCard(): void {
    this.hasBeenLiked = !this.hasBeenLiked;
    this.hasBeenLiked ? this.postCard.likeCount++ : this.postCard.likeCount--;
    const request: LikeOrDislike = {postId: this.postCard.id, like: this.hasBeenLiked}
    this.postService.likeOrDislike(request).subscribe();
  }

  addToFavoredPosts(): void {
    this.isFavoredPost = !this.isFavoredPost;
    const request: AddToFavoredRequest = {
      postId: this.postCard.id,
      userId: this.authService.connectedUser!.id,
      add: this.isFavoredPost
    }
    if (!this.isFavoredPost) {
      this.authService.connectedUser!.favoredPosts = this.authService.connectedUser!.favoredPosts.filter(post => post !== this.postCard.id);
    } else {
      this.authService.connectedUser!.favoredPosts.push(this.postCard.id);
    }
    this.userService.addOrRemoveFavoredPost(request).subscribe(() => this.router.navigateByUrl('home'));
  }

}
