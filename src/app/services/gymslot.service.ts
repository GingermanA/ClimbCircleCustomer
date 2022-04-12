import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SessionService } from './session.service';
import { Gymslot } from '../models/gymslot';
import { CreateBookingRequest } from '../models/create-booking-request';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GymslotService {
  baseUrl: string = '/api/GymSlot';

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  getGymSlot(gymSlotId: number): Observable<Gymslot> {
    return this.httpClient
      .get<Gymslot>(this.baseUrl + '/retrieveGymSlot/' + gymSlotId)
      .pipe(catchError(this.handleError));
  }

  getGymSlotsForGym(gymId: number, date: string): Observable<Gymslot[]> {
    return this.httpClient
      .get<Gymslot[]>(this.baseUrl + '/retrieveGymSlots/' + gymId + '/' + date)
      .pipe(catchError(this.handleError));
  }

  getGymSlotsForCustomer(): Observable<Gymslot[]> {
    return this.httpClient
      .get<Gymslot[]>(
        this.baseUrl + '/retrieveGymSlots/' + this.sessionService.getUsername()
      )
      .pipe(catchError(this.handleError));
  }

  createBooking(gymSlotId: number): Observable<any> {
    let createBookingRequest: CreateBookingRequest = new CreateBookingRequest(
      gymSlotId,
      this.sessionService.getUsername()
    );

    return this.httpClient
      .post<any>(this.baseUrl, createBookingRequest, httpOptions)
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
