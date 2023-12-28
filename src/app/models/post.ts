export class Post {
  id: string;
  createdAt?: Date;
  source: string;
  counters?: any;
  userRatingCounter?: any;
  link: string;
  url: string;
  static fromEntityResult(entity: any): Post {
    if (entity != null && entity.source) {
      const post: Post = {
        id: entity.id,
        source: entity.source,
        counters: entity.counters,
        createdAt: new Date(entity.createdAt.seconds * 1000),
        userRatingCounter: entity.userRatingCounter,
        link: entity.link,
        url: entity.url

      };
      return post;
    } else {
      return null;
    }
  }
  static fromEntityListResult(entity: any[]): Post[] {
    const result: Post[] = [];
    if (entity && entity.length) {
      entity.forEach(element => {
        const post: Post = {
          id: element.id,
          source: element.source,
          counters: element.counters,
          createdAt: new Date(element.createdAt.seconds * 1000),
          userRatingCounter: element.userRatingCounter,
          link: element.link,
          url:element.url
        };
        result.push(post);
      });
    }
    return result;
  }
  constructor() {}
}
