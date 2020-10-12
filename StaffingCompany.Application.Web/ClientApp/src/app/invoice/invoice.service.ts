import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private api: WebApiService) { }

  addInvoice(json: any): Observable<any> {
    return this.api.post('/invoice/addinvoice', json);
  }

  getAllInvoiceDetail(){
    return this.api.get('/invoice/invoicedetail');
  }

  getInvoiceDescription(id): Observable<any> {
    return this.api.get('/invoice/invoicedescription', JSON.stringify({invoiceId : id}));
  }
}
