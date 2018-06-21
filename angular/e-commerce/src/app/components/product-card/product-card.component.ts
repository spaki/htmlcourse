import { Component, OnInit, Input  } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() entity: Product;

  constructor() { }

  ngOnInit() {
  }

}
