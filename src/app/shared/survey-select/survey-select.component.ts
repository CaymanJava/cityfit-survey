import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Survey, SurveyService } from '../../core/survey';

@Component({
  selector: 'app-survey-select',
  templateUrl: './survey-select.component.html',
  styleUrls: ['./survey-select.component.scss']
})
export class SurveySelectComponent implements OnInit, OnDestroy {

  surveySubscription: Subscription;
  dropdownSettings;
  surveys: Survey[];
  selectedSurvey;

  @Output() surveySelected: EventEmitter<number[]> = new EventEmitter();

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.loadSurveys();
    this.initSettings();
  }

  ngOnDestroy() {
    this.surveySubscription.unsubscribe();
  }

  onSurveySelectedOrDeselected() {
    this.surveySelected.emit(this.selectedSurvey.map(survey => survey.id));
  }

  onFilterClear() {
    this.surveySelected.emit([]);
  }

  private initSettings() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  private loadSurveys() {
    this.surveySubscription = this.surveyService.getSurveys()
      .subscribe(result => {
        this.surveys = result.content;
      });
  }

}
