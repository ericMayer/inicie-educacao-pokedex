import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * Requisição get do HttpClient
   *
   * @param {{}} url endpoint da API
   * @param {{}} options parâmetros para ser enviado no get
   *
   *
   */
  public get<T>(url: string, options?: any): Observable<any> {
    return this.http.get<T>(url, options).pipe(take(1));
  }
}
