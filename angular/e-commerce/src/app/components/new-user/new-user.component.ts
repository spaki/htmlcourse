import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = <User>{};
  }

  create(){
    this.userService.Create(this.user).subscribe(
      result => {
        this.userService.SaveInStorage(result);
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
