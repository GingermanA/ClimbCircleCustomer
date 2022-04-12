import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GymslotService } from '../services/gymslot.service';
import { Gymslot } from '../models/gymslot';

import { Location } from '@angular/common';

@Component({
  selector: 'app-create-new-booking',
  templateUrl: './create-new-booking.page.html',
  styleUrls: ['./create-new-booking.page.scss'],
})
export class CreateNewBookingPage implements OnInit {
  gymSlotId: number;
  gymSlot: Gymslot;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gymSlotService: GymslotService,
    private location: Location
  ) {}

  ngOnInit() {
    this.gymSlotId = parseInt(this.activatedRoute.snapshot.params.id);

    this.gymSlotService.getGymSlot(this.gymSlotId).subscribe({
      next: (response) => {
        this.gymSlot = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  confirm() {
    this.gymSlotService.createBooking(this.gymSlotId).subscribe({
      next: (response) => {
        //console.log(response);
        //this.location.back();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
