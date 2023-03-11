import {Component, OnInit} from '@angular/core';
import {PostCard} from "../../services/Post";
import {PostService} from "../../services/post.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts?: PostCard[];
  tempArray?: PostCard[];
  searchControl = new FormControl();

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getRecentPosts().subscribe(posts => {
      this.posts = posts;
      this.tempArray = posts;
    });
    this.searchControl.valueChanges.subscribe(value => this.applyFilter(value));
  }

  applyFilter(filterValue: string) {
    this.tempArray = this.posts?.filter(postCard =>
      postCard.tag.toLowerCase().includes(filterValue.toLowerCase())
      || postCard.title.toLowerCase().includes(filterValue.toLowerCase()));
  }

}
