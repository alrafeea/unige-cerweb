export class MenuItem {
  id: string;
  title: string;
  state: string;
  type: string;
  order: number;
  static fromEntityResult(entity: any): MenuItem {
    const item: MenuItem = {
      id: entity.id,
      state: entity.state,
      type: entity.type,
      title: entity.title,
      order: entity.order
    };
    return item;
  }
  static fromEntityListResult(entity: any[]): MenuItem[] {
    const result: MenuItem[] = [];
    if (entity && entity.length) {
      entity.forEach(element => {
        const item: MenuItem = {
          id: element.id,
          state: element.state,
          type: element.type,
          title: element.title,
          order: element.order
        };
        result.push(item);
      });
    }
    return result.sort((a, b) => a.order - b.order);
  }
  constructor() {}
}
