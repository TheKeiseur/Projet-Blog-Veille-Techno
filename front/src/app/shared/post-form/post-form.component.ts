import {Component, Input, OnInit} from '@angular/core';
import {Post, PostRequest} from "../../services/Post";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  form!: FormGroup;
  @Input()
  isAdd?: boolean;
  @Input()
  post?: Post;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.post?.title, [Validators.required]),
      category: new FormControl(this.post?.tag, [Validators.required]),
      content: new FormControl(this.post?.content, [Validators.required]),
      photo: new FormControl(this.post?.image, [Validators.required])
    })
  }

  submit(): void {
    this.isAdd ? this.createPost() : this.editPost();
  }

  createPost(): void {
    const {title, category, content, photo} = this.form.value;
    const newPost = this.getNewPost(title, category, content, photo);
    this.postService.createPost(newPost).subscribe(() => this.router.navigateByUrl('/home'));
  }

  editPost(): void {
    const {title, category, content} = this.form.value;
    this.post!.title = title;
    this.post!.tag = category;
    this.post!.content = content;
    this.postService.updatePost(this.post!).subscribe(() => this.router.navigateByUrl('/home'));
  }

  getNewPost(title: string, category: string, content: string, photo: string): PostRequest {
    return {
      author_id: this.authService.getConnectedUser()!.id,
      title: title,
      tag: category,
      content: content,
      image: photo,
      date: new Date()
    }
  }

}
