import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HelperService } from '../../services/helper.service';
import { Product } from '../../models/Product';
import { PagedResult } from '../../models/PagedResult';
import { PaginationItem } from '../../models/PaginationItem';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pagedResult: PagedResult<Product>;
  pages: Array<PaginationItem>;
  page = 1;
  value = "";
  message = "";

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private helperService: HelperService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fillParameters(params);
      this.getProducts();
    });
  }

  getProducts() {
    this.productService.GetByValue(this.value, this.page).subscribe(
      result => {
        this.pagedResult = result;
        this.buildPagination();
        this.buildMessage();
      },
      error => console.error(error)
    );
  }

  fillParameters(params: Params){
    this.page = params["page"];
    this.value = params["value"];

    if(isNaN(this.page))
      this.page = 1;

    if(this.helperService.IsNullOrWhiteSpaceOrEmpty(this.value))
      this.value = "";
  }

  buildPagination(){
    this.pages = new Array<PaginationItem>();
    for (var i = 1; i <= this.pagedResult.totalPages; i++) {
      var selected = false;

      if(this.page == i)
        selected = true;

      var item = { 
        index: i, 
        searchValue: this.value, 
        selected: selected 
      };

      this.pages.push(item);
    }
  }

  buildMessage() {
    this.message = "";

    if(this.helperService.IsNullOrWhiteSpaceOrEmpty(this.pagedResult.items))
      this.message = "Products not found!";
  }
}
