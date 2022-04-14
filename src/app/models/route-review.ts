import { Customer } from './customer';
import { Gym } from './gym';
import { Route } from './route';
import { RouteRatingEnum } from './route-rating-enum';

export class RouteReview {
  routeReviewId: number;
  content: string;
  rating: RouteRatingEnum;
  gym: Gym;
  route: Route;
  customer: Customer;

  constructor(
    routeReviewId?: number,
    content?: string,
    rating?: RouteRatingEnum
  ) {
    this.routeReviewId = routeReviewId;
    this.content = content;
    this.rating = rating;
  }
}
