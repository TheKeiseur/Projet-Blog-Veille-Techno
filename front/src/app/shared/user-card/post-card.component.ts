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
  isAdmin: boolean = false;

  constructor(private postService: PostService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
  }

  calcAge(dateString: string) {
    const birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
  }

  getBirthdate(dateString: string) {
    const birthday = new Date(dateString);
    return moment(birthday).locale('fr').format('DD MMMM');
  }

  deleteUser() {
    // this.postService.deleteUserById(this.postCard!.id).subscribe(() => this.router.navigateByUrl('/users'));
  }

}
