import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GymService } from '../services/gym.service';
import { Gym } from '../models/gym';
import { Gymslot } from '../models/gymslot';

import { format } from 'date-fns';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.page.html',
  styleUrls: ['./gyms.page.scss'],
})
export class GymsPage implements OnInit {
  type: string;
  selectedSlot: number = 0;
  currDate: string = format(new Date(), 'yyyy-MM-dd');
  gymId: number;
  gym: Gym;
  gymSlots: Gymslot[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gymService: GymService
  ) {
    this.type = 'slots';
  }

  ngOnInit() {
    this.gymId = parseInt(this.activatedRoute.snapshot.params.id);

    this.gymService.getGymDetails(this.gymId).subscribe({
      next: (response) => {
        this.gym = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.gymService.getGymSlots(this.gymId, this.currDate).subscribe({
      next: (response) => {
        this.gymSlots = response;
        console.log(this.gymSlots);
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
    this.gymService.getGymSlots(this.gymId, this.currDate).subscribe({
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
}
