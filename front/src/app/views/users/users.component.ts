import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../services/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  onFilter($event: User[]) {
    this.users = $event;
  }

}
