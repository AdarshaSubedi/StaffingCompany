import { WebApiService } from './../../core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: WebApiService) { }

  getLogin(json): Observable<any> {
    return this.api.post('/account/login', json);
  }

}
