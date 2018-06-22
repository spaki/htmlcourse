import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class UserService {
  storageKey = "user-info";
  @Output('userSaved') userSaved: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private helperService: HelperService) { }

  Login(user: User): Observable<User> {
    let endpoint = this.helperService.GetEndpoint('api/User/login/');
    var result = this.http.post<User>(endpoint, user);
    return result;
  }

  Create(user: User): Observable<User> {
    let endpoint = this.helperService.GetEndpoint('api/User/');
    var result = this.http.post<User>(endpoint, user);
    return result;
  }

  SaveInStorage(user: User) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    this.userSaved.emit(true);
  }

  GetFromStorage(): User {
    var json = localStorage.getItem(this.storageKey);

    if(this.helperService.IsNullOrWhiteSpaceOrEmpty(json))
      return null;

    var result = JSON.parse(json);
    return result;
  }
}
