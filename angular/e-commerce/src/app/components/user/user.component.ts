import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { User } from '../../models/User';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  orders: Order[];

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
    this.user = this.userService.GetFromStorage();
    this.orderService.GetByUser(this.user.email).subscribe(
      result => this.orders = result,
      error => console.log(error)
    );
  }

}
