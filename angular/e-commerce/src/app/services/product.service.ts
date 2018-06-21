import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';
import { PagedResult } from '../models/PagedResult';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  GetByValue(value: string, page: number): Observable<PagedResult<Product>> {
    var query = [
      this.helper.GetQueryString("value", value),
      this.helper.GetQueryString("page", page),
      this.helper.GetQueryString("pageSize", this.helper.GetPaginationSize())
    ];
    let endpoint = this.helper.GetEndpoint('api/Product/' + this.helper.ConcatQueryStrings(query));
    var result = this.http.get<PagedResult<Product>>(endpoint);
    return result;
  }

  GetById(id: number): Observable<Product> {
    let endpoint = this.helper.GetEndpoint('api/Product/' + id.toString());
    var result = this.http.get<Product>(endpoint);
    return result;
  }
}
