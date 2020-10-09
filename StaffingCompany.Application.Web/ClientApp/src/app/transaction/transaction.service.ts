import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  // tslint:disable-next-line: radix
  insertPersonId: number = parseInt(localStorage.getItem('userId'));

  constructor(private api: WebApiService) { }

  getTransactionDetail(){
    return this.api.get('/transaction/transactiondetail');
  }

  addTransaction(id): Observable<any> {
    const json: any = {
      assignmentId: id,
      insertPersonId: this.insertPersonId
    };
    return this.api.post('/transaction/addtransaction', json);
  }

}
