import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  insertPersonId: number = parseInt(localStorage.getItem('userId'));

  constructor(private api: WebApiService) { }

  getCustomerDetail() {
    return this.api.get('/customer/customerdetail');
  }

  addCustomer(json): Observable<any> {
    json.insertPersonId = this.insertPersonId;
    return this.api.post('/customer/addcustomer', json);
  }
  updateCustomer(json): Observable<any> {
    json.insertPersonId = this.insertPersonId;
    return this.api.post('/customer/updatecustomer', json);
  }

}
