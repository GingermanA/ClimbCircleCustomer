export class CreateBookingRequest {
  gymSlotId: number;
  username: string;

  constructor(gymSlotId?: number, username?: string) {
    this.gymSlotId = gymSlotId;
    this.username = username;
  }
}
