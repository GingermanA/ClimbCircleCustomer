import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { SessionService } from '../services/session.service';
import { GymslotService } from '../services/gymslot.service';
import { Gymslot } from '../models/gymslot';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  customer: Customer;

  constructor(
    private customerService: CustomerService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.customerService.getCustomer().subscribe({
      next: (response) => {
        this.customer = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editProfile() {
    this.router.navigate(['edit-profile']);
  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentCustomer(null);
    this.router.navigate(['/login']);
  }
}
