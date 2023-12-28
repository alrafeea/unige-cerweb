export class ReliabilityTypes {
    id: string;
    name: string;
    color: string;
    counter?: number;
    static fromEntityResult(entity: any): ReliabilityTypes {
      const type: ReliabilityTypes = {
        id: entity.id,
        name: entity.name,
        color: entity.color
      };
      return type;
    }
    static fromEntityListResult(entity: any[]): ReliabilityTypes[] {
      const result: ReliabilityTypes[] = [];
      if (entity && entity.length) {
        entity.forEach(element => {
          const type: ReliabilityTypes = {
            id: element.id,
            name: element.name,
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
