import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouteService } from '../services/route.service';
import { Route } from '../models/route';
import { RouteReviewService } from '../services/route-review.service';
import { RouteReview } from '../models/route-review';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {
  route: Route;
  routeId: number;
  routeReviews: RouteReview[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private routeReviewService: RouteReviewService
  ) {}

  ngOnInit() {
    this.routeId = parseInt(this.activatedRoute.snapshot.params.id);

    this.routeService.getRouteById(this.routeId).subscribe({
      next: (response) => {
        this.route = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.routeReviewService.getRouteReviewsForRoute(this.routeId).subscribe({
      next: (response) => {
        this.routeReviews = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
