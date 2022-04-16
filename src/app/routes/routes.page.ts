import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteService } from '../services/route.service';
import { Route } from '../models/route';
import { RouteReviewService } from '../services/route-review.service';
import { RouteReview } from '../models/route-review';
import { RouteRatingEnum } from '../models/route-rating-enum';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {
  route: Route;
  routeId: number;
  routeReviews: RouteReview[];
  routeRatingKeys: string[] = Object.keys(RouteRatingEnum);
  routeRatings: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private routeReviewService: RouteReviewService,
    private router: Router
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

    this.routeReviewService.getRouteRatingsForRoute(this.routeId).subscribe({
      next: (response) => {
        this.routeRatings = response;

        //aggregating results
        let sum: number = 0;
        for (let i = 0; i < this.routeRatings.length; i++) {
          let rating: RouteRatingEnum = this.routeRatings[i][0];
          let count: number = this.routeRatings[i][1];

          sum = sum + RouteRatingEnum[rating.toString()] * count;
        }

        console.log(sum);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addReview() {
    this.router.navigate(['createRouteReview', this.routeId]);
  }
}
