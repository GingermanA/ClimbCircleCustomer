import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(['/login']);
  }
}
