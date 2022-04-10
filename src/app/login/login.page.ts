import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        let customer: Customer = response;
        this.sessionService.setCurrentCustomer(customer);
        this.sessionService.setIsLogin(true);
        this.router.navigate(['/tabs']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
