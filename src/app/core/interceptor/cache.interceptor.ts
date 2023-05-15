import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<string, HttpResponse<any>> = new Map();

  private setCache(event: HttpEvent<any>, url: string): void {
    if (event instanceof HttpResponse && event.status === 200)
      this.cache.set(url, event.clone());
  }

  private sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) =>
        this.setCache(event, request.url)
      )
    );
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method?.toUpperCase() !== 'GET')
      return next.handle(request);

    const cachedResponse: HttpResponse<any> = this.cache.get(request.url);

    if (cachedResponse)
      return of(cachedResponse.clone());

    return this.sendRequest(request, next);
  }
}
