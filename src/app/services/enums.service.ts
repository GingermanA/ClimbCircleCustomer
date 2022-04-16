import { Injectable } from '@angular/core';
import { RouteRatingEnum } from '../models/route-rating-enum';

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  RouteRatingEnum = RouteRatingEnum;

  constructor() {}
}
