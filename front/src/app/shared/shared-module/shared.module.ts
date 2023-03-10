import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostCardComponent} from "../post-card/post-card.component";
import {UserFormComponent} from "../user-form/user-form.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {PostFormComponent} from '../post-form/post-form.component';
import {CardListComponent} from '../card-list/card-list.component';
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
  declarations: [
    PostCardComponent,
    UserFormComponent,
    PostFormComponent,
    CardListComponent
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
    MatGridListModule
  ],
  exports: [
    PostCardComponent,
    UserFormComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    PostFormComponent,
    CardListComponent
  ]
})
export class SharedModule {
}
