import { Component, OnInit } from '@angular/core';

import { GymslotService } from '../services/gymslot.service';
import { Gymslot } from '../models/gymslot';

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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
