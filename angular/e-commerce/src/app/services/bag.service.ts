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

  AddItem(userMail: string, item: BagItem): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/Bag/' + encodeURIComponent(userMail));
    var result = this.http.patch(endpoint, item);
    return result;
  }

  Clear(userMail: string): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/Bag/Disable/'+ encodeURIComponent(userMail));
    var result = this.http.patch(endpoint, null);
    return result;
  }
}
