import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../services/User";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";
import {Post} from "../../services/Post";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  component = 'post';
  id = '';
  add = false;
  user?: User;
  post?: Post;

  constructor(private userService: UserService,
              private postService: PostService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.pathFromRoot[1].url.pipe(
      concatMap(segments => {
        this.component = segments[0].path;
        console.log(this.component);
        this.id = segments[1].path;
        if (this.component === 'user') {
          console.log('User')
          return this.userService.getUserById(this.id);
        } else {
          console.log('Post')
          return this.postService.getPostById(this.id)
        }
      })).subscribe(value => {
      this.component === 'user' ? this.user = value as User : this.post = value as Post;
    });
  }

}
