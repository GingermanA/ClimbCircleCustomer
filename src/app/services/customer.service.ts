import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from './session.service';

import { Customer } from '../models/customer';
import { CreateCustomerRequest } from '../models/create-customer-request';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl: string = '/api/Customer';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getCustomer(): Observable<Customer> {
    return this.httpClient
      .get<Customer>(
        this.baseUrl + '/retrieveCustomer/' + this.sessionService.getUsername()
      )
      .pipe(catchError(this.handleError));
  }

  createNewCustomer(
    newCustomer: Customer,
    subscriptionPlan: string
  ): Observable<number> {
    let createCustomerRequest: CreateCustomerRequest =
      new CreateCustomerRequest(newCustomer, subscriptionPlan);
    return this.httpClient
      .put<number>(this.baseUrl, createCustomerRequest, httpOptions)
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
