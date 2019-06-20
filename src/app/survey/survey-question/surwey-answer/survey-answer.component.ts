import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SurveyAnswer, SurveyAnswerResult, SurveyAnswerType } from '../../../core/survey';

@Component({
  selector: 'app-survey-answer',
  templateUrl: './survey-answer.component.html',
  styleUrls: ['./survey-answer.component.scss']
})
export class SurveyAnswerComponent implements OnInit {
  @Input() surveyAnswers: SurveyAnswer[] = [];
  @Input() multiple = false;
  @Output() answerSelected: EventEmitter<SurveyAnswerResult> = new EventEmitter();

  selectedAnswer: any;
  multipleAnswersIds: number[] = [];
  hoverElem = null;

  chosenAnswer: Set<number> = new Set<number>();

  constructor() {

  }

  ngOnInit() {
  }

  isValueChecked(id: number): boolean {
    const index = this.multipleAnswersIds.findIndex(i => i === id);
    return index !== -1;
  }

  processMultipleAnswer(id: number) {
    const index = this.multipleAnswersIds.indexOf(id);
    if (index !== -1) {
      this.multipleAnswersIds.splice(index, 1);
    } else {
      this.multipleAnswersIds.push(id);
    }
  }

  multipleAnswers() {
    return this.multiple;
  }

  singleAnswer() {
    return !this.multiple;
  }

  predefinedSingleAnswer(answer: SurveyAnswer): boolean {
    return answer.maxPoints === null && SurveyAnswerType.isPredefinedAnswer(answer.type);
  }

  customAnswer(answer: SurveyAnswer): boolean {
    return answer.maxPoints === null && SurveyAnswerType.isOpenAnswer(answer.type);
  }

  pointAnswer(answer): boolean {
    return answer.maxPoints !== null;
  }

  selectSingleAnswer(answer: SurveyAnswer) {
    const answerResult: SurveyAnswerResult = new SurveyAnswerResult();
    answerResult.answer = answer;
    answerResult.type = 'single';
    this.answerSelected.emit(answerResult);
  }

  selectPointAnswer(answer: SurveyAnswer, point: number) {
    const answerResult: SurveyAnswerResult = new SurveyAnswerResult();
    answerResult.answer = answer;
    answerResult.points = point;
    answerResult.type = 'point';
    this.answerSelected.emit(answerResult);
    this.selectedAnswer = null;
  }

  selectCustomAnswer(answer: SurveyAnswer, customAnswer: string) {
    const answerResult: SurveyAnswerResult = new SurveyAnswerResult();
    answerResult.answer = answer;
    answerResult.customAnswer = customAnswer;
    answerResult.type = 'custom';
    this.answerSelected.emit(answerResult);
    this.selectedAnswer = null;
  }

  selectMultipleAnswers(multipleAnswersIds: number[]) {
    const answerResult: SurveyAnswerResult = new SurveyAnswerResult();
    answerResult.answersIds = multipleAnswersIds;
    answerResult.type = 'multiple';
    this.answerSelected.emit(answerResult);
    this.selectedAnswer = null;
  }

  getPoints(points: number): number[] {
    const pointsRange: number[] = [];
    for (let i = 1; i <= points; ++i) {
      pointsRange.push(i);
    }
    return pointsRange;
  }

  onMouseOver(point: number) {
    this.hoverElem = point;
  }
}
