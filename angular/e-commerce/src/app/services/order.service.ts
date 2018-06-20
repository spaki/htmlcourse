import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/Order';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  GetByUser(userMail: string): Observable<Order[]> {
    let endpoint = this.helper.GetEndpoint('api/Order/' + encodeURIComponent(userMail));
    var result = this.http.get<Order[]>(endpoint);
    return result;
  }

  Checkout(order: Order): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/Order/');
    var result = this.http.post(endpoint, order);
    return result;
  }
}
