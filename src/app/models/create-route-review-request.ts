import { RouteReview } from './route-review';

export class CreateRouteReviewRequest {
  routeReview: RouteReview;
  username: string;
  routeId: number;

  constructor(routeReview?: RouteReview, username?: string, routeId?: number) {
    this.routeReview = routeReview;
    this.username = username;
    this.routeId = routeId;
  }
}
