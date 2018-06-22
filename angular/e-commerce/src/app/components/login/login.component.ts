import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  message: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = <User>{};
  }

  login() {
    this.userService.Login(this.user).subscribe(
      result => {
        this.userService.SaveInStorage(result);
        this.router.navigate(['']);
      },
      error => {
        this.message = "Invalid user!";
      }
    );
  }
}
