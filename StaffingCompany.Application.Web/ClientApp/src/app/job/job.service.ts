import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  insertPersonId: number = parseInt(localStorage.getItem('userId'));

  constructor(private api: WebApiService) { }

  getJobDetail() {
    return this.api.get('/job/jobdetail');
  }

  addJob(json): Observable<any> {
    json.insertPersonId = this.insertPersonId;
    return this.api.post('/job/addjob', json);
  }
  updateJob(json): Observable<any> {
    json.insertPersonId = this.insertPersonId;
    return this.api.post('/job/updatejob', json);
  }
}
