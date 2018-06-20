import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/Product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  GetByValue(value: string): Observable<Product[]> {
    let endpoint = this.helper.GetEndpoint('api/Product/value=' + encodeURIComponent(value));
    var result = this.http.get<Product[]>(endpoint);
    return result;
  }

  GetById(id: number): Observable<Product> {
    let endpoint = this.helper.GetEndpoint('api/Product/' + id.toString());
    var result = this.http.get<Product>(endpoint);
    return result;
  }
}
