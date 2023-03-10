import {Component, OnInit} from '@angular/core';
import {PostCard} from "../../services/Post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-users',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts?: PostCard[];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getRecentPosts().subscribe(posts => this.posts = posts);
  }

}
