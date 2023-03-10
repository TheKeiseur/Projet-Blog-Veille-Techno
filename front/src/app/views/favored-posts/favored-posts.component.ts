import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {PostCard} from "../../services/Post";

@Component({
  selector: 'app-favored-posts',
  templateUrl: './favored-posts.component.html',
  styleUrls: ['./favored-posts.component.scss']
})
export class FavoredPostsComponent implements OnInit {

  favoredPosts?: PostCard[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getFavoredPosts().subscribe(posts => {
      this.favoredPosts = posts;
      console.log(this.favoredPosts);
    });
  }
}
