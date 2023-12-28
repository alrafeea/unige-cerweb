export class RatingType {
  id: string;
  name: string;
  color: string;
  icon: string;
  counter?: number;
  static fromEntityResult(entity: any): RatingType {
    const type: RatingType = {
      id: entity.id,
      name: entity.name,
      icon: entity.icon,
      color: entity.color
    };
    return type;
  }
  static fromEntityListResult(entity: any[]): RatingType[] {
    const result: RatingType[] = [];
    if (entity && entity.length) {
      entity.forEach(element => {
        const type: RatingType = {
          id: element.id,
          name: element.name,
          icon: element.icon,
          color: element.color
        };
        result.push(type);
      });
    }
    result.sort((a, b) => parseInt(a.id, 0) - parseInt(b.id, 0));
    return result;
  }
  constructor() {}
}
