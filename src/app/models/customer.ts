import { Gymslot } from './gymslot';
import { SubscriptionPlan } from './subscription-plan';

export class Customer {
  customerId: number | undefined;
  username: string | undefined;
  password: string | undefined;
  email: string | undefined;
  numOfPassesLeft: number | undefined;
  expiryDate: Date | undefined;
  gymSlots: Gymslot[] | undefined;
  subscriptionPlan: SubscriptionPlan | undefined;

  constructor(
    customerId?: number,
    username?: string,
    password?: string,
    email?: string,
    numOfPassesLeft?: number,
    expiryDate?: Date
  ) {
    this.customerId = customerId;
    this.username = username;
    this.password = password;
    this.email = email;
    this.numOfPassesLeft = numOfPassesLeft;
    this.expiryDate = expiryDate;
  }
}
