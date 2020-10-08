import { WebApiService } from './../../core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: WebApiService) { }

  getEmployeeDetail(){
    return this.api.get('/employee/employeedetail');
  }

  addEmployee(json): Observable<any> {
    return this.api.post('/employee/addemployee', json);
  }
  updateEmployee(json): Observable<any> {
    return this.api.post('/employee/updateemployee', json);
  }
}
