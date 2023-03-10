import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoredPostsComponent} from "./favored-posts.component";
import {SharedModule} from "../../shared/shared-module/shared.module";
import {FavoredPostsRoutingModule} from "./favored-posts-routing.module";

@NgModule({
  declarations: [
    FavoredPostsComponent
  ],
  imports: [
    CommonModule,
    FavoredPostsRoutingModule,
    SharedModule
  ]
})
export class FavoredPostsModule {
}
