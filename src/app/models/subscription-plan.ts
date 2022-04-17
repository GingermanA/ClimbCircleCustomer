export class SubscriptionPlan {
  subscriptionPlanId: number | undefined;
  name: string | undefined;
  price: number | undefined;
  numOfPasses: number | undefined;
  validity: number | undefined;

  constructor(
    subscriptionPlanId?: number,
    name?: string,
    price?: number,
    numOfPasses?: number,
    validity?: number
  ) {
    this.subscriptionPlanId = subscriptionPlanId;
    this.name = name;
    this.price = price;
    this.numOfPasses = numOfPasses;
    this.validity = validity;
  }
}
