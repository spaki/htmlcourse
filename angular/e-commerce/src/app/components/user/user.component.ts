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

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
  }

}
