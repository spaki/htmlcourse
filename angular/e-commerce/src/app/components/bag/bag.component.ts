import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BagService } from '../../services/bag.service';
import { OrderService } from '../../services/order.service';
import { PaymentMethodService } from '../../services/payment-method.service';
import { HelperService } from '../../services/helper.service';
import { User } from '../../models/User';
import { Bag } from '../../models/Bag';
import { PaymentMethod } from '../../models/PaymentMethod';
import { Order } from '../../models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {
  user: User;
  paymentMethods: PaymentMethod[];
  paymentMethodId: number;
  bag: Bag;
  message: string;

  constructor(
    private userService: UserService,
    private bagService: BagService,
    private orderService: OrderService,
    private paymentMethodService: PaymentMethodService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.user = this.userService.GetFromStorage();

    if(!this.helperService.IsNullOrWhiteSpaceOrEmpty(this.user)) {
      this.message = null;

      this.paymentMethodService.GetAll().subscribe(
        result => { 
          this.paymentMethods = result;
          this.paymentMethodId = this.paymentMethods[0].id;
        },
        error => console.log(error)
      );

      this.bagService.GetByUser(this.user.email).subscribe(
        result => {
          this.bag = result;

          if(this.helperService.IsNullOrWhiteSpaceOrEmpty(this.bag) || this.helperService.IsNullOrWhiteSpaceOrEmpty(this.bag.items)) 
            this.message = "The bag is empty!";
          else
            this.message = null;
        },
        error => console.log(error)
      );
    }
    else {
      this.message = "Login first to start to buy.";
    }
  }

  checkout() {
    var order = <Order> { 
      userMail: this.user.email, 
      bagId: this.bag.id, 
      paymentMethodId: this.paymentMethodId 
    };

    this.orderService.Checkout(order).subscribe(
      result => this.clearBag(),
      error => console.log(error)
    );
  }

  clearBag() {
    this.bagService.Clear(this.user.email).subscribe(
      result => this.router.navigate(['/checkout']),
      error => console.log(error)
    );
  }

  itemRemoved(event: boolean){
    this.refresh();
  }
}