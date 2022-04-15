import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RouteReview } from '../models/route-review';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RouteReviewService {
  baseUrl: string = '/api/RouteReview';

  constructor(private httpClient: HttpClient) {}

  getRouteReviewsForRoute(routeId: number): Observable<RouteReview[]> {
    return this.httpClient
      .get<RouteReview[]>(this.baseUrl + '/retrieveRouteReviews/' + routeId)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'An unknown error has occurred: ' + error.error;
    } else {
      errorMessage =
        'A HTTP error has occurred: ' + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
