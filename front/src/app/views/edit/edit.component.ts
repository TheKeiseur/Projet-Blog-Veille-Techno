import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../services/User";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  component: string = 'post';
  user?: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {

    this.route.params.pipe(
      concatMap(params => {
        const id = params['id'];
        return this.userService.getUserById(id);
      })).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.route.pathFromRoot[1].url.subscribe(value => this.component = value[0].path);
  }

}
