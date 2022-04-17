import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { SubscriptionPlan } from '../models/subscription-plan';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {

  baseUrl: string = "/api/SubscriptionPlan";


  constructor(private httpClient: HttpClient) {
  }

  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this.httpClient.get<SubscriptionPlan[]>(this.baseUrl + "/retrieveAllSubscriptionPlans").pipe
      (
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = "An unknown error has occurred: " + error.error;
    }
    else {
      errorMessage = "A HTTP error has occurred: " + `HTTP ${error.status}: ${error.error}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
