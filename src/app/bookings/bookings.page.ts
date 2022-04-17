import { Component, OnInit } from '@angular/core';

import { GymslotService } from '../services/gymslot.service';
import { Gymslot } from '../models/gymslot';
import { format } from 'date-fns';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  gymSlots: Gymslot[];
  gymImageUrl: string =
    'http://localhost:8080/GP14-war/uploadedFiles/gym_profile_pictures/';

  constructor(private gymSlotService: GymslotService) {}

  ngOnInit() {
    this.gymSlotService.getGymSlotsForCustomer().subscribe({
      next: (response) => {
        this.gymSlots = response;

        this.gymSlots.forEach((gymSlot) => {
          gymSlot.gymEntity.profilePictureURL =
            this.gymImageUrl + gymSlot.gymEntity.profilePictureURL;
        });

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

        this.gymSlots.forEach((gymSlot) => {
          const date = gymSlot.date;
          const dateParts = date
            .toString()
            .substring(0, 10)
            .split('-')
            .map(Number);
          let newDate: Date = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2] + 1
          );
          gymSlot.dateString = format(newDate, 'dd/MM/yyyy');
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

        this.gymSlots.forEach((gymSlot) => {
          const date = gymSlot.date;
          const dateParts = date
            .toString()
            .substring(0, 10)
            .split('-')
            .map(Number);
          let newDate: Date = new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2] + 1
          );
          gymSlot.dateString = format(newDate, 'dd/MM/yyyy');
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
