import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Gym } from '../models/gym';
import { Gymslot } from '../models/gymslot';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class GymService {
  baseUrl: string = '/api/Gym';

  constructor(private httpClient: HttpClient) {}

  getAllGyms(): Observable<Gym[]> {
    return this.httpClient
      .get<Gym[]>(this.baseUrl + '/retrieveAllGyms')
      .pipe(catchError(this.handleError));
  }

  getGymDetails(gymId: number): Observable<Gym> {
    return this.httpClient
      .get<Gym>(this.baseUrl + '/retrieveGym/' + gymId)
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
