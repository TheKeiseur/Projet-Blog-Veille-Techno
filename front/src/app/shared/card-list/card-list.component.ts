import {Component, Input} from '@angular/core';
import {PostCard} from "../../services/Post";

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  @Input()
  posts?: PostCard[];

}
