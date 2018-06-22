import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.user = this.userService.GetFromStorage();
  }

  logoff() {
    this.userService.SaveInStorage(null);
    this.refresh();
  }
}
