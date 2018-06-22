import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { BagService } from '../../services/bag.service';
import { UserService } from '../../services/user.service';
import { BagItem } from '../../models/BagItem';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag-item',
  templateUrl: './bag-item.component.html',
  styleUrls: ['./bag-item.component.css']
})
export class BagItemComponent implements OnInit {
  @Input() item: BagItem;
  @Output('itemRemoved') itemRemoved: EventEmitter<boolean> = new EventEmitter<boolean>();
  product: Product;

  constructor(
    private productService: ProductService,
    private bagService: BagService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.GetById(this.item.productId).subscribe(
      result => this.product = result,
      error => console.log(error)
    );
  }

  getTotal(): number {
    return this.product.price * this.item.quantity;
  }

  remove() {
    var user = this.userService.GetFromStorage();
    this.bagService.RemoveItem(user.email, this.item.productId).subscribe(
      result => this.itemRemoved.emit(true),
      error => console.log(error)
    );
  }
}
