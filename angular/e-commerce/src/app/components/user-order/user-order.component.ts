import { Component, OnInit, Input } from '@angular/core';
import { PaymentMethodService } from '../../services/payment-method.service';
import { BagService } from '../../services/bag.service';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/Order';
import { PaymentMethod } from '../../models/PaymentMethod';
import { Bag } from '../../models/Bag';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  @Input() entity: Order;
  paymentMethod: PaymentMethod;
  bag: Bag;
  total: number = 0;

  constructor(
    private paymentMethodService: PaymentMethodService,
    private bagService: BagService,
    private userService: UserService
  ) { }

  ngOnInit() {
    var user = this.userService.GetFromStorage();

    this.bagService.GetById(user.email, this.entity.bagId).subscribe(
      result => { 
        this.bag = result;
      },
      error => console.log(error)
    );

    this.paymentMethodService.GetById(this.entity.paymentMethodId).subscribe(
      result => this.paymentMethod = result,
      error => console.log(error)
    );
  }
}
