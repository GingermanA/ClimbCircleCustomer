import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GymslotService } from '../services/gymslot.service';
import { Gymslot } from '../models/gymslot';
import { SessionService } from '../services/session.service';

import { Location } from '@angular/common';
import { Customer } from '../models/customer';
import { add, format } from 'date-fns';
import { toDate } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

@Component({
  selector: 'app-create-new-booking',
  templateUrl: './create-new-booking.page.html',
  styleUrls: ['./create-new-booking.page.scss'],
})
export class CreateNewBookingPage implements OnInit {
  gymSlotId: number;
  gymSlot: Gymslot;
  gymSlotDate: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gymSlotService: GymslotService,
    private sessionService: SessionService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.gymSlotId = parseInt(this.activatedRoute.snapshot.params.id);

    this.gymSlotService.getGymSlot(this.gymSlotId).subscribe({
      next: (response) => {
        this.gymSlot = response;
        const date = this.gymSlot.date;
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
        this.gymSlotDate = format(newDate, 'dd/MM/yyyy');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  confirm() {
    let passes: number = this.sessionService.getPasses();
    this.sessionService.setPasses(passes - 1);
    this.gymSlotService.createBooking(this.gymSlotId).subscribe({
      next: (response) => {
        //console.log(response);
        this.router.navigate(['/tabs/bookings']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancel() {
    this.location.back();
  }
}
