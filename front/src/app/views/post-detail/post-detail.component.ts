import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";
import {PostService} from "../../services/post.service";
import {Post} from "../../services/Post";
import {formatDate} from "../../utils/DateUtils";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {

  post?: Post;

  constructor(private postService: PostService,
              private route: ActivatedRoute) {
    this.route.params.pipe(
      concatMap(params => {
        const id = params['id'];
        return this.postService.getPostById(id);
      })).subscribe(post => this.post = post);
  }

  getFormattedDate(date: Date): string {
    return formatDate(date);
  }
}
