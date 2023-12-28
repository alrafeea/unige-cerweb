export class UserSummary {
  uid?: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  static fromEntityResult(entity: any): UserSummary {
    const user: UserSummary = {
      uid: entity.uid,
      email: entity.email,
      displayName: entity.displayName,
      firstName: entity.firstName,
      lastName: entity.lastName,
      photoURL: entity.photoURL
    };
    return user;
  }
  static fromEntityListResult(entity: any[]): UserSummary[] {
    const result: UserSummary[] = [];
    if (entity && entity.length) {
      entity.forEach(element => {
        const user: UserSummary = {
          uid: element.uid,
          email: element.email,
          displayName: element.displayName,
          firstName: element.firstName,
          lastName: element.lastName,
          photoURL: element.photoURL
        };
        result.push(user);
      });
    }
    return result;
  }
  constructor() {}
}
