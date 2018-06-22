import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { Bag } from '../models/Bag';
import { BagItem } from '../models/BagItem';

@Injectable()
export class BagService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  GetByUser(userMail: string): Observable<Bag> {
    let endpoint = this.helper.GetEndpoint('api/Bag/' + encodeURIComponent(userMail));
    var result = this.http.get<Bag>(endpoint);
    return result;
  }

  GetById(userMail: string, id: string): Observable<Bag> {
    let endpoint = this.helper.GetEndpoint('api/Bag/' + encodeURIComponent(userMail) + "/id/" + encodeURIComponent(id));
    var result = this.http.get<Bag>(endpoint);
    return result;
  }

  GetHistoryByUser(userMail: string): Observable<Bag[]> {
    let endpoint = this.helper.GetEndpoint('api/Bag/' + encodeURIComponent(userMail) + "/history");
    var result = this.http.get<Bag[]>(endpoint);
    return result;
  }

  AddItem(userMail: string, item: BagItem): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/Bag/' + encodeURIComponent(userMail));
    var result = this.http.patch(endpoint, item);
    return result;
  }

  RemoveItem(userMail: string, productId: number): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/Bag/' + encodeURIComponent(userMail) + "/removeItem/" + encodeURIComponent(productId.toString()));
    var result = this.http.patch(endpoint, null);
    return result;
  }

  Clear(userMail: string): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/Bag/Disable/'+ encodeURIComponent(userMail));
    var result = this.http.patch(endpoint, null);
    return result;
  }
}
