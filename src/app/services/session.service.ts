import { Injectable } from '@angular/core';

import { Customer } from '../models/customer';
import { SubscriptionPlan } from '../models/subscription-plan';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  getIsLogin(): boolean {
    if (sessionStorage['isLogin'] == 'true') {
      return true;
    } else {
      return false;
    }
  }

  setIsLogin(isLogin: boolean): void {
    sessionStorage['isLogin'] = isLogin;
  }

  getCurrentCustomer(): Customer {
    return JSON.parse(sessionStorage['currentCustomer']);
  }

  setCurrentCustomer(currentCustomer: Customer | null): void {
    sessionStorage['currentCustomer'] = JSON.stringify(currentCustomer);
  }

  getUsername(): string {
    return sessionStorage['username'];
  }

  setUsername(username: string | undefined): void {
    sessionStorage['username'] = username;
  }

  getPassword(): string {
    return sessionStorage['password'];
  }

  setPassword(password: string | undefined): void {
    sessionStorage['password'] = password;
  }

  getPasses(): number {
    return sessionStorage['passes'];
  }

  setPasses(passes: number | undefined): void {
    sessionStorage['passes'] = passes;
  }

  getSubscriptionPlan(): string {
    return sessionStorage['subscriptionPlan'];
  }

  setSubscriptionPlan(subscriptionPlan: string | undefined): void {
    sessionStorage['subscriptionPlan'] = subscriptionPlan;
  }

  getReviews(): number {
    return sessionStorage['reviews'];
  }

  setReviews(reviews: number | undefined): void {
    sessionStorage['reviews'] = reviews;
  }
}
