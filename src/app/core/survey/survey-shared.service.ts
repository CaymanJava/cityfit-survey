import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SurveySharedService {

  private _campaignIds: number[] = null;

  get campaignIds(): number[] {
    return this._campaignIds;
  }

  set campaignIds(value: number[]) {
    this._campaignIds = value;
  }

  private _clubId: number = null;

  get clubId(): number {
    return this._clubId;
  }

  set clubId(value: number) {
    this._clubId = value;
  }

  private _surveyId: number = null;

  get surveyId(): number {
    return this._surveyId;
  }

  set surveyId(value: number) {
    this._surveyId = value;
  }

  clear() {
    this._campaignIds = [];
    this._clubId = null;
    this._surveyId = null;
  }

  isDataCompleted() {
    return this.campaignIds !== null
      && this.campaignIds.length > 0
      && this.clubId !== null
      && this.surveyId !== null;
  }

}
