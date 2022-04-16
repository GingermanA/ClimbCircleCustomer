import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GymService } from '../services/gym.service';
import { GymslotService } from '../services/gymslot.service';
import { RouteService } from '../services/route.service';
import { Gym } from '../models/gym';
import { Gymslot } from '../models/gymslot';
import { Route } from '../models/route';
import { RouteRatingEnum } from '../models/route-rating-enum';
import { EnumsService } from '../services/enums.service';

import { format } from 'date-fns';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.page.html',
  styleUrls: ['./gyms.page.scss'],
})
export class GymsPage implements OnInit {
  type: string;
  selectedSlot: number = 0;
  minDate: string = format(new Date(), 'yyyy-MM-dd');
  currDate: string = format(new Date(), 'yyyy-MM-dd');
  currTime: string = new Date().toLocaleTimeString();
  gymId: number;
  gym: Gym;
  gymSlots: Gymslot[];
  gymImageUrl: string =
    'http://localhost:8080/GP14-war/uploadedFiles/gym_profile_pictures/';
  routes: Route[];
  unsortedRoutes: Route[];
  sort: number = 0;

  constructor(
    public enums: EnumsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gymService: GymService,
    private gymSlotService: GymslotService,
    private routeService: RouteService,
    private alertController: AlertController
  ) {
    this.type = 'routes';
  }

  ngOnInit() {
    this.gymId = parseInt(this.activatedRoute.snapshot.params.id);

    this.gymService.getGymDetails(this.gymId).subscribe({
      next: (response) => {
        console.log(response);
        this.gym = response;
        this.gymImageUrl = this.gymImageUrl + this.gym.profilePictureURL;
        console.log(this.gymImageUrl);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.gymSlotService.getGymSlotsForGym(this.gymId, this.currDate).subscribe({
      next: (response) => {
        this.gymSlots = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.routeService.getRoutesForGym(this.gymId).subscribe({
      next: (response) => {
        this.routes = response;
        this.unsortedRoutes = this.routes.slice();

        //sort routes in ascending difficulty
        // this.routes.sort((a, b) => {
        //   const order = [];
        //   for (let key in RouteRatingEnum) {
        //     order.push(key);
        //   }
        //   const index1 = order.findIndex(
        //     (key) => RouteRatingEnum[key] === a.routeRating.toString()
        //   );
        //   const index2 = order.findIndex(
        //     (key) => RouteRatingEnum[key] === b.routeRating.toString()
        //   );
        //   return index1 - index2;
        // });

        console.log(this.routes);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  dateChanged(date) {
    this.selectedSlot = 0;
    //console.log(date.detail.value.substring(0, 10));
    this.currDate = date.detail.value.substring(0, 10);
    this.gymSlotService.getGymSlotsForGym(this.gymId, this.currDate).subscribe({
      next: (response) => {
        this.gymSlots = response;
        console.log(this.gymSlots);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClick(gymSlotId: number) {
    console.log(gymSlotId);
    this.selectedSlot = gymSlotId;
  }

  bookSlot() {
    this.gymSlotService.getGymSlotsForCustomer().subscribe({
      next: (response) => {
        let customerGymSlots: Gymslot[] = response;
        let canRedirect: Boolean = true;
        for (let i = 0; i < customerGymSlots.length; i++) {
          if (customerGymSlots[i].gymSlotId == this.selectedSlot) {
            canRedirect = false;
            this.alertController
              .create({
                header: 'Alert',
                message: 'You have already booked this gym slot',
                buttons: ['OK'],
              })
              .then((res) => {
                res.present();
              });

            break;
          }
        }

        if (canRedirect) {
          this.router.navigate(['createNewBooking', this.selectedSlot]);
        }
      },
    });
  }

  sortRoutes() {
    const routeComparator = (a, b) => {
      const order = [];
      for (let key in RouteRatingEnum) {
        order.push(key);
      }
      const index1 = order.findIndex(
        (key) => RouteRatingEnum[key] === a.routeRating.toString()
      );
      const index2 = order.findIndex(
        (key) => RouteRatingEnum[key] === b.routeRating.toString()
      );
      return index1 - index2;
    };

    if (this.sort == 1) {
      this.routes.sort(routeComparator);
    } else if (this.sort == 2) {
      this.routes.sort(routeComparator).reverse();
    } else {
      this.routes = this.unsortedRoutes;
    }
  }

  redirect(routeId: number) {
    this.router.navigate(['routes', routeId]);
  }
}
