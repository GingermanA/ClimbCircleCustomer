import { Gym } from './gym';
import { Customer } from './customer';

export class Gymslot {
  gymSlotId: number | undefined;
  vacancies: number | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
  date: Date | undefined;
  gymEntity: Gym | undefined;
  customers: Customer[] | undefined;

  constructor(
    gymSlotId?: number,
    vacancies?: number,
    startTime?: Date,
    endTime?: Date,
    date?: Date
  ) {
    this.gymSlotId = gymSlotId;
    this.vacancies = vacancies;
    this.startTime = startTime;
    this.endTime = endTime;
    this.date = date;
  }
}
