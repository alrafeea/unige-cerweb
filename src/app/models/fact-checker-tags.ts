export class FactCheckerTags {
    id: string;
    name: string;
    counter?: number;
    static fromEntityResult(entity: any): FactCheckerTags {
      const type: FactCheckerTags = {
        id: entity.id,
        name: entity.name,
      };
      return type;
    }
    static fromEntityListResult(entity: any[]): FactCheckerTags[] {
      const result: FactCheckerTags[] = [];
      if (entity && entity.length) {
        entity.forEach(element => {
          const type: FactCheckerTags = {
            id: element.id,
            name: element.name,
          };
          result.push(type);
        });
      }
      result.sort((a, b) => parseInt(a.id, 0) - parseInt(b.id, 0));
      return result;
    }
    constructor() {}
  }
