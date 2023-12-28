import { UserSummary } from '../models/user-summary';

export class ValidateCommand {
  postId: string;
  // type: RatingType;
  // claims: string[];
  // isTitleMisleading: boolean;
  user: UserSummary;
  createdAt: Date;
  id: string;
  factCheckerTags?: [];
  hashtags?: [];
  reliabilityType?: [];
  // Expert Form
  expert: any;
  topics: any[];
  references: any[];
  questionsAndAnswers: any[];
  summary: string;
  context: string;
  analysis: string;
  isAnonymousValidator: boolean;
  static fromForm(form: any, user: any, encId: string, reviewRef: string): ValidateCommand {
    const command = new ValidateCommand();
    command.postId = encId;
    command.id = reviewRef;
    // command.type = form.type;
    // command.
    command.factCheckerTags = form.factCheckerTags;
    command.reliabilityType = form.reliabilityTypes;
    command.hashtags = form.hashtags;
    command.createdAt = new Date();
    command.user = UserSummary.fromEntityResult(user);
    // command.claims = form.claims.map(c => c.claim);
    // command.isTitleMisleading = form.isTitleMisLeading;

    return { ...command };
  }

  static fromExpertForm(
    form: any,
    user: any,
    expertProfile: any,
    encId: string,
    reviewRef: string
  ): ValidateCommand {
    const command = new ValidateCommand();
    command.postId = encId;
    command.id = reviewRef;
    command.expert = expertProfile;
    command.user = UserSummary.fromEntityResult(user);
    command.createdAt = new Date();
    // command.claims = form.claims.map(c => c.claim);
    command.topics = form.topics;
    command.references = form.references;
    command.questionsAndAnswers = form.questionsAndAnswers;
    command.summary = form.summary;
    command.context = form.context;
    command.analysis = form.analysis;
    command.isAnonymousValidator = form.isAnonymousValidator;
    command.factCheckerTags = form.factCheckerTags;
    command.reliabilityType = form.reliabilityTypes;
    command.hashtags = form.hashtags;
    return { ...command };
  }
  constructor() { }
}
