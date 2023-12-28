import { UserSummary } from './user-summary';
import { RatingType } from './rating-type';

export class ExpertReview {
  id: string;
  expert: any;
  user: UserSummary;
  createdAt: Date;
  factCheckerTags: [];
  hashtags: [];
  reliabilityType?: [];
  topics: any[];
  references: any[];
  questionsAndAnswers: any[];
  summary: string;
  context: string;
  analysis: string;
  isAnonymousValidator: boolean;
  static fromEntityResult(entity: any): ExpertReview {
    if (entity == null) {
      return null;
    }
    const rev: ExpertReview = {
      id: entity.id,
      expert: entity.expert,
      createdAt: entity.createdAt
        ? new Date(entity.createdAt.seconds * 1000)
        : new Date(),
      user: UserSummary.fromEntityResult(entity.user),
      factCheckerTags: entity.factCheckerTags,
      hashtags: entity.hashtags,
      reliabilityType: entity.reliabilityType,
      topics: entity.topics,
      references: entity.references,
      questionsAndAnswers: entity.questionsAndAnswers,
      summary: entity.summary,
      context: entity.context,
      analysis: entity.analysis,
      isAnonymousValidator: entity.isAnonymousValidator,
    };
    return rev;
  }
  static fromEntityListResult(entity: any[]): ExpertReview[] {
    const result: ExpertReview[] = [];
    if (entity && entity.length) {
      entity.forEach(element => {
        const rev: ExpertReview = {
          id: element.id,
          expert: element.expert,
          createdAt: element.createdAt
            ? new Date(element.createdAt.seconds * 1000)
            : new Date(),
          user: UserSummary.fromEntityResult(element.user),
          factCheckerTags: element.factCheckerTags,
          hashtags: element.hashtags,
          reliabilityType: element.reliabilityType,
          topics: element.topics,
          references: element.references,
          questionsAndAnswers: element.questionsAndAnswers,
          summary: element.summary,
          context: element.context,
          analysis: element.analysis,
          isAnonymousValidator: element.isAnonymousValidator,

        };
        result.push(rev);
      });
    }
    return result;
  }
  constructor() { }
}
