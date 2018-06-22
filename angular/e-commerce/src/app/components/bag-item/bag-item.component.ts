import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { BagItem } from '../../models/BagItem';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-bag-item',
  templateUrl: './bag-item.component.html',
  styleUrls: ['./bag-item.component.css']
})
export class BagItemComponent implements OnInit {
  @Input() item: BagItem;
  product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetById(this.item.productId).subscribe(
      result => this.product = result,
      error => console.log(error)
    );
  }

  getTotal(): number {
    return this.product.price * this.item.quantity;
  }
}
