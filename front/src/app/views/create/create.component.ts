import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  component = 'post';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.pathFromRoot[1].url.subscribe(segments => this.component = segments[0].path);
  }

}
