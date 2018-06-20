import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { PaymentMethod } from '../models/PaymentMethod';

@Injectable()
export class PaymentMethodService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  GetAll(): Observable<PaymentMethod[]> {
    let endpoint = this.helper.GetEndpoint('api/PaymentMethod/');
    var result = this.http.get<PaymentMethod[]>(endpoint);
    return result;
  }

  GetById(id: number): Observable<PaymentMethod> {
    let endpoint = this.helper.GetEndpoint('api/PaymentMethod/' + id.toString());
    var result = this.http.get<PaymentMethod>(endpoint);
    return result;
  }
}
