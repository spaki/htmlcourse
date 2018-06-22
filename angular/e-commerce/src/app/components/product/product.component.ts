import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { BagService } from '../../services/bag.service';
import { UserService } from '../../services/user.service';
import { Product } from '../../models/Product';
import { BagItem } from '../../models/BagItem';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  entity: Product;
  id: number;
  user: User;

  constructor(
    private productService: ProductService, 
    private activatedRoute: ActivatedRoute,
    private bagService: BagService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.GetFromStorage();
    this.activatedRoute.params.subscribe(params => {
      this.fillParameters(params);
      this.getProduct();
    });
  }

  getProduct() {
    this.productService.GetById(this.id).subscribe(
      result => this.entity = result,
      error => console.error(error)
    );
  }

  fillParameters(params: Params){
    this.id = params["id"];
  }

  buy() {
    var item = <BagItem> { productId: this.id, quantity: 1 };
    this.bagService.AddItem(this.user.email, item).subscribe(
      result => this.router.navigate(['/bag']),
      error => console.error(error)
    );
  }
}
