import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient ) { }

  post(url: string, body: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + url, body, {headers: this.getHeaderOptions()});
  }
  get(url: string, params?: any): Observable<any> {
    return this.httpClient.get(this.apiUrl + url, { headers: this.getHeaderOptions(), params: {json: params} });
  }

  getHeaderOptions(): HttpHeaders {

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Method', 'GET, POST');
    headers.set('Access-Control-Allow-Origin', 'Origin, Content-Type');
    return headers;

  }
}
