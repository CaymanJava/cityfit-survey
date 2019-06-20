export class Survey {
  id: number;
  name: string;
  questions: SurveyQuestion[];
  completed: boolean;
}

export namespace Survey {
  export function processSurveyAllowed(survey: Survey) {
    return survey.completed;
  }
}

export class SurveyQuestion {
  id: number;
  multiple: boolean;
  question: string;
  answers: SurveyAnswer[];
}

export class SurveyAnswer {
  id: number;
  description: string;
  maxPoints: number;
  type: SurveyAnswerType;
}

export enum SurveyType {
  NEW_MEMBER,
  CAMPAIGN,
  RESIGNATION,
  WWW
}

export enum SurveyAnswerType {
  PREDEFINED,
  OPEN
}

export namespace SurveyAnswerType {

  export function isPredefinedAnswer(surveyAnswerType: SurveyAnswerType) {
    return compareSurveyAnswerTypes(surveyAnswerType, SurveyAnswerType.PREDEFINED);
  }

  export function isOpenAnswer(surveyAnswerType: SurveyAnswerType) {
    return compareSurveyAnswerTypes(surveyAnswerType, SurveyAnswerType.OPEN);
  }

  export function compareSurveyAnswerTypes(first, second) {
    const surveyAnswerTypeValue = SurveyAnswerType[first];
    if (typeof surveyAnswerTypeValue === 'number') {
      return surveyAnswerTypeValue === second;
    } else {
      return surveyAnswerTypeValue === SurveyAnswerType[second];
    }
  }
}

export class SurveySingleAnswer {
  answerId: number;
}

export class SurveyPointAnswer {
  answerId: number;
  points: number;
}

export class SurveyMultipleAnswers {
  answersIds: number[];
}

export class SurveyCustomAnswer {
  answerId: number;
  customAnswer: string;
}

export class SurveyAnswerResult {
  answer: SurveyAnswer;
  customAnswer: string;
  points: number;
  answersIds: number[];
  type: string;
}
