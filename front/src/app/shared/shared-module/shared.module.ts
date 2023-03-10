import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostCardComponent} from "../user-card/post-card.component";
import {UserFormComponent} from "../user-form/user-form.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {UserBadgeComponent} from "../user-card/user-badge/user-badge.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {PostFormComponent} from '../post-form/post-form.component';


@NgModule({
  declarations: [
    PostCardComponent,
    UserFormComponent,
    UserBadgeComponent,
    PostFormComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatSlideToggleModule,
  ],
  exports: [
    PostCardComponent,
    UserFormComponent,
    UserBadgeComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    PostFormComponent
  ]
})
export class SharedModule {
}
