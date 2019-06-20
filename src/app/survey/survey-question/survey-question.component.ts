import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Survey,
  SurveyAnswerResult,
  SurveyCustomAnswer,
  SurveyMultipleAnswers,
  SurveyPointAnswer,
  SurveyQuestion,
  SurveySingleAnswer
} from '../../core/survey';


@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss']
})
export class SurveyQuestionComponent implements OnInit {
  @Input() survey: Survey;
  @Input() surveyQuestions: SurveyQuestion[] = [];
  @Output() surveyCompleted: EventEmitter<any> = new EventEmitter();
  currentQuestion = 0;

  constructor() {
  }

  ngOnInit() {
    console.log(this.survey);
    console.log(this.surveyQuestions);
  }

  onAnswerSelected(answer: SurveyAnswerResult) {
    this.processSelectedAnswer(answer);
    if (this.surveyQuestions.length > this.currentQuestion + 1) {
      this.currentQuestion += 1;
    } else {
      this.currentQuestion = 0;
      this.surveyCompleted.emit(this.survey.id);
    }
  }

  processSelectedAnswer(answer: SurveyAnswerResult) {
    switch (answer.type) {
      case ('single'):
        this.processSingleAnswer(answer);
        break;
      case ('point'):
        this.processPointAnswer(answer);
        break;
      case ('custom'):
        this.processCustomAnswer(answer);
        break;
      case ('multiple'):
        this.processMultipleAnswers(answer);
        break;
      default:
        break;
    }
  }

  private processCustomAnswer(answer: SurveyAnswerResult) {
    const surveyCustomAnswer: SurveyCustomAnswer = new SurveyCustomAnswer();
    surveyCustomAnswer.answerId = answer.answer.id;
    surveyCustomAnswer.customAnswer = answer.customAnswer;
    // this.surveyService.addCustomAnswer(this.survey.id, surveyCustomAnswer);
  }

  private processPointAnswer(answer: SurveyAnswerResult) {
    const surveyPointAnswer: SurveyPointAnswer = new SurveyPointAnswer();
    surveyPointAnswer.answerId = answer.answer.id;
    surveyPointAnswer.points = answer.points;
    // this.surveyService.addPointAnswer(this.survey.id, surveyPointAnswer);
  }

  private processSingleAnswer(answer: SurveyAnswerResult) {
    const surveySingleAnswer: SurveySingleAnswer = new SurveySingleAnswer();
    surveySingleAnswer.answerId = answer.answer.id;
    // this.surveyService.addSingleAnswer(this.survey.id, surveySingleAnswer);
  }

  private processMultipleAnswers(answer: SurveyAnswerResult) {
    const surveyMultipleAnswers: SurveyMultipleAnswers = new SurveyMultipleAnswers();
    surveyMultipleAnswers.answersIds = answer.answersIds;
    // this.surveyService.addMultipleAnswers(this.survey.id, surveyMultipleAnswers);
  }
}
