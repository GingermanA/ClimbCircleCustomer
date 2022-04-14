import { RouteRatingEnum } from './route-rating-enum';
import { RouteReview } from './route-review';

export class Route {
  routeId: number;
  routeName: string;
  description: string;
  routeRating: RouteRatingEnum;
  routeImageURL: string;
  location: string;
  color: string;
  routeReviews: RouteReview[];

  constructor(
    routeId?: number,
    routeName?: string,
    description?: string,
    routeRating?: RouteRatingEnum,
    routeImageURL?: string,
    location?: string,
    color?: string
  ) {
    this.routeId = routeId;
    this.routeName = routeName;
    this.description = description;
    this.routeRating = routeRating;
    this.routeImageURL = routeImageURL;
    this.location = location;
    this.color = color;
  }
}
