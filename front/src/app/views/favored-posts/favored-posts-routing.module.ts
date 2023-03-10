import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavoredPostsComponent} from "./favored-posts.component";

const routes: Routes = [{path: '', component: FavoredPostsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoredPostsRoutingModule {
}
