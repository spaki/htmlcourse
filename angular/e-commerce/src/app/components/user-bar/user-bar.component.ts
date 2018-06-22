import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BagService } from '../../services/bag.service';
import { User } from '../../models/User';
import { Bag } from '../../models/Bag';
import { HelperService } from '../../services/helper.service';

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
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.user = this.userService.GetFromStorage();

    if(!this.helperService.IsNullOrWhiteSpaceOrEmpty(this.user))
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

  logoff() {
    this.userService.SaveInStorage(null);
    this.refresh();
  }
}
