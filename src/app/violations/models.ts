export const ViolationStatus = {
  NEW: 'NEW',
  SENT: 'SENT',
  CLOSED: 'CLOSED',
};

type ViolationStatusType = keyof typeof ViolationStatus;

export class Person {
  firstName: String = '';
  lastName: String = '';
  address: String = '';
  phone: String = '';
  email: String = '';
};

export class Gps {
  lat: Number;
  lon: Number;
};

export class Location {
  city: String = '';
  subdistrict: String = '';
  country: String = 'Lietuva';
  street: String = '';
  houseNumber: String = '';
  gps: Gps;
};

export class Violation {
  _id?: String;
  createdAt?: Date;
  updatedAt?: Date;
  status?: ViolationStatusType;
  shotAt: Date;
  plate: String;
  images: String[];
  location: Location = new Location();
  notes: String;
  witness: Person = new Person();
};
