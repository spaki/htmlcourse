import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BagService } from '../../services/bag.service';
import { User } from '../../models/User';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  user: User;
  count: string;

  constructor(
    private userService: UserService, 
    private bagService: BagService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.userSaved.subscribe(event => this.refresh())
    this.refresh();
  }

  refresh() {
    this.user = this.userService.GetFromStorage();

    if(!this.helperService.IsNullOrWhiteSpaceOrEmpty(this.user)) {
      this.bagService.GetByUser(this.user.email).subscribe(
        result => { 
          if(
            !this.helperService.IsNullOrWhiteSpaceOrEmpty(result)
            && !this.helperService.IsNullOrWhiteSpaceOrEmpty(result.items)
          )
            this.count = result.items.length.toString();
        }, 
        error => console.log(error));
      }
      else {
        this.count = null;
      }
  }

  logoff() {
    this.userService.SaveInStorage(null);
    this.router.navigate(['']);
  }
}
