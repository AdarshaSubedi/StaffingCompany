import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  // tslint:disable-next-line: radix
  insertPersonId: number = parseInt(localStorage.getItem('userId'));

  constructor(private api: WebApiService) { }

  getAssignmentDetail(){
    return this.api.get('/assignment/assignmentdetail');
  }

  addAssignment(json): Observable<any> {
    json.insertPersonId = this.insertPersonId;
    return this.api.post('/assignment/addassignment', json);
  }
  updateAssignment(json): Observable<any> {
    json.insertPersonId = this.insertPersonId;
    return this.api.post('/assignment/updateassignment', json);
  }
}
