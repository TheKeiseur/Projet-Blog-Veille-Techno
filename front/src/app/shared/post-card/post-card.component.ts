import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PostCard} from "../../services/Post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input()
  postCard?: PostCard;
  isAdmin = false;
  isUserPost = false;
  hasBeenLiked = false;

  constructor(private postService: PostService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.isUserPost = this.authService.connectedUser?.id === this.postCard?.author_id;
  }

  calcAge(dateString: string) {
    const birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
  }

  getBirthdate(dateString: string) {
    const birthday = new Date(dateString);
    return moment(birthday).locale('fr').format('DD MMMM');
  }

  deleteCard() {
    this.postService.deletePost(this.postCard!.id).subscribe(() => this.router.navigateByUrl('/home'));
  }

  likeCard() {
    if (!this.hasBeenLiked) {
      this.postCard!.likeCount++;
      this.postService.likeOrDislike({postId: this.postCard!.id, like: true}).subscribe(value => console.log(value));
    }
    this.hasBeenLiked = true;
    console.log(this.hasBeenLiked);
  }
}
