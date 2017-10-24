export const ViolationStatus = {
  NEW: 'NEW',
  SENT: 'SENT',
  CLOSED: 'CLOSED',
};

type ViolationStatusType = keyof typeof ViolationStatus;

export class Person {
  public firstName: String = '';
  public lastName: String = '';
  public address: String = '';
  public phone: String = '';
  public email: String = '';
};

export class Gps {
  public lat: Number;
  public lon: Number;
};

export class Location {
  public city: String = '';
  public subdistrict: String = '';
  public country: String = 'Lietuva';
  public street: String = '';
  public houseNumber: String = '';
  public gps: Gps;
};

export class Violation {
  public _id?: String;
  public createdAt?: Date;
  public updatedAt?: Date;
  public status?: ViolationStatusType;
  public shotAt: Date;
  public plate: String;
  public images: String[];
  public location: Location = new Location();
  public notes: String;
  public witness: Person = new Person();
};
