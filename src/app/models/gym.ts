import { FacilitiesEnum } from './facilities-enum';
import { Gymslot } from './gymslot';

export class Gym {
  gymId: number | undefined;
  username: string | undefined;
  password: string | undefined;
  franchise: string | undefined;
  gymName: string | undefined;
  address: string | undefined;
  profilePictureURL: string | undefined;
  operatingHours: string | undefined;
  contactNumber: string | undefined;
  facilities: FacilitiesEnum[] | undefined;
  gymSlots: Gymslot[] | undefined;

  constructor(
    gymId?: number,
    username?: string,
    password?: string,
    franchise?: string,
    gymName?: string,
    address?: string,
    profilePictureURL?: string,
    operatingHours?: string,
    contactNumber?: string,
    facilities?: FacilitiesEnum[]
  ) {
    this.gymId = gymId;
    this.username = username;
    this.gymName = gymName;
    this.franchise = franchise;
    this.password = password;
    this.address = address;
    this.profilePictureURL = profilePictureURL;
    this.operatingHours = operatingHours;
    this.contactNumber = contactNumber;
    this.facilities = facilities;
  }
}
