import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private helper: HelperService) { }

  Login(user: User): Observable<User> {
    let endpoint = this.helper.GetEndpoint('api/User/login/');
    var result = this.http.post<User>(endpoint, user);
    return result;
  }

  Create(user: User): Observable<any> {
    let endpoint = this.helper.GetEndpoint('api/User/');
    var result = this.http.post(endpoint, user);
    return result;
  }
}
