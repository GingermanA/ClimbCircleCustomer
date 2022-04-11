import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GymService } from '../services/gym.service';
import { Gym } from '../models/gym';

@Component({
  selector: 'app-gyms',
  templateUrl: './gyms.page.html',
  styleUrls: ['./gyms.page.scss'],
})
export class GymsPage implements OnInit {
  gymId: number;
  gym: Gym;

  constructor(
    private activatedRoute: ActivatedRoute,
    private gymService: GymService
  ) {}

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
  }
}
