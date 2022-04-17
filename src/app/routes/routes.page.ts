import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RouteService } from '../services/route.service';
import { Route } from '../models/route';
import { RouteReviewService } from '../services/route-review.service';
import { RouteReview } from '../models/route-review';
import { RouteRatingEnum } from '../models/route-rating-enum';
import { EnumsService } from '../services/enums.service';
import { format } from 'date-fns';

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
  userRating: RouteRatingEnum;
  numOfRatings: number = 0;
  Math = Math;
  routeImageUrl: string =
    'http://localhost:8080/GP14-war/uploadedFiles/route_pictures/';

  constructor(
    public enums: EnumsService,
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private routeReviewService: RouteReviewService,
    private router: Router,
    private location: Location
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
        this.routeReviews = response.reverse();

        this.routeReviews.forEach((routeReview) => {
          const date = routeReview.datePosted;
          const dateParts = date
            .toString()
            .substring(0, 10)
            .split('-')
            .map(Number);
          let newDate: Date = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2]
          );
          routeReview.dateString = format(newDate, 'dd/MM/yyyy');
        });
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.routeReviewService.getRouteRatingsForRoute(this.routeId).subscribe({
      next: (response) => {
        this.routeRatings = response;

        //aggregating results
        let highestCount: number = 0;
        for (let i = 0; i < this.routeRatings.length; i++) {
          let rating: RouteRatingEnum = this.routeRatings[i][0];
          let count: number = this.routeRatings[i][1];

          this.numOfRatings += count;

          if (count > highestCount) {
            highestCount = count;
            this.userRating = rating;
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ionViewWillEnter() {
    this.numOfRatings = 0;
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
        this.routeReviews = response.reverse();

        this.routeReviews.forEach((routeReview) => {
          const date = routeReview.datePosted;
          const dateParts = date
            .toString()
            .substring(0, 10)
            .split('-')
            .map(Number);
          let newDate: Date = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2]
          );
          routeReview.dateString = format(newDate, 'dd/MM/yyyy');
        });

        this.routeReviewService
          .getRouteRatingsForRoute(this.routeId)
          .subscribe({
            next: (response) => {
              this.routeRatings = response;

              //aggregating results
              let highestCount: number = 0;
              for (let i = 0; i < this.routeRatings.length; i++) {
                let rating: RouteRatingEnum = this.routeRatings[i][0];
                let count: number = this.routeRatings[i][1];

                this.numOfRatings += count;

                if (count > highestCount) {
                  highestCount = count;
                  this.userRating = rating;
                }
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addReview() {
    this.router.navigate(['createRouteReview', this.routeId]);
  }

  back() {
    this.location.back();
  }
}
