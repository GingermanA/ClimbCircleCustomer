import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteReviewService } from '../services/route-review.service';
import { RouteReview } from '../models/route-review';

import { EnumsService } from '../services/enums.service';
import { RouteRatingEnum } from '../models/route-rating-enum';

@Component({
  selector: 'app-create-route-review',
  templateUrl: './create-route-review.page.html',
  styleUrls: ['./create-route-review.page.scss'],
})
export class CreateRouteReviewPage implements OnInit {
  routeId: number;
  routeReview: RouteReview;
  routeRatingKeys: string[] = Object.keys(RouteRatingEnum);
  selectedRating: string = '';

  constructor(
    public enums: EnumsService,
    private activatedRoute: ActivatedRoute,
    private routeReviewService: RouteReviewService
  ) {
    this.routeReview = new RouteReview();
  }

  ngOnInit() {
    this.routeId = parseInt(this.activatedRoute.snapshot.params.id);
  }

  onClick(routeRating: string) {
    console.log(routeRating);
    this.selectedRating = routeRating;
    this.routeReview.rating = RouteRatingEnum[routeRating];
    console.log(this.routeReview);
  }

  createReview() {
    this.routeReviewService
      .createRouteReview(this.routeReview, this.routeId)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
