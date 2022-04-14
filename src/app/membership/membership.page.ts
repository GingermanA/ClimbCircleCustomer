import { Component, OnInit } from '@angular/core';

import { GymslotService } from '../services/gymslot.service';
import { Gymslot } from '../models/gymslot';

import { compareAsc, format } from 'date-fns';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  gymSlots: Gymslot[];

  constructor(private gymSlotService: GymslotService) {}

  ngOnInit() {
    this.gymSlotService.getGymSlotsForCustomer().subscribe({
      next: (response) => {
        this.gymSlots = response;
        this.gymSlots.sort((a, b) => {
          if (a.date == b.date) {
            return (
              parseInt(a.startTime.toString().substring(0, 2)) -
              parseInt(b.startTime.toString().substring(0, 2))
            );
          } else if (a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //so bookings are updated after confirmation
  ionViewWillEnter() {
    this.gymSlotService.getGymSlotsForCustomer().subscribe({
      next: (response) => {
        this.gymSlots = response;
        this.gymSlots.sort((a, b) => {
          if (a.date == b.date) {
            return (
              parseInt(a.startTime.toString().substring(0, 2)) -
              parseInt(b.startTime.toString().substring(0, 2))
            );
          } else if (a.date < b.date) {
            return -1;
          } else {
            return 1;
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
