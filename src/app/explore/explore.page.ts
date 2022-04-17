import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { GymService } from '../services/gym.service';
import { Gym } from '../models/gym';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  //images = ['1.jpg', '2.jpg', '3.jpg'];
  gyms: Gym[];
  gymImageUrl: string =
    'http://localhost:8080/GP14-war/uploadedFiles/gym_profile_pictures/';

  constructor(
    private sessionService: SessionService,
    private gymService: GymService,
    private router: Router
  ) {}

  ngOnInit() {
    this.gymService.getAllGyms().subscribe({
      next: (response) => {
        this.gyms = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
