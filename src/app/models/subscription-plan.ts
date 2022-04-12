
export class SubscriptionPlan {
    subscriptionPlanId: number | undefined;
    name: string | undefined;
    price: number | undefined;

    constructor(
        subscriptionPlanId?: number,
        name?: string,
        price?: number
    ){
        this.subscriptionPlanId = subscriptionPlanId;
        this.name = name;
        this.price = price;
    }
}
