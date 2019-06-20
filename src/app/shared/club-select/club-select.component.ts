import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Club, ClubService } from '../../core/club';

@Component({
  selector: 'app-club-select',
  templateUrl: './club-select.component.html',
  styleUrls: ['./club-select.component.scss']
})
export class ClubSelectComponent implements OnInit, OnDestroy {

  clubSubscription: Subscription;
  dropdownSettings;
  clubs: Club[];
  selectedSurvey;

  @Output() clubSelected: EventEmitter<number[]> = new EventEmitter();

  constructor(private clubService: ClubService) {
  }

  ngOnInit() {
    this.loadClub();
    this.initSettings();
  }

  ngOnDestroy() {
    this.clubSubscription.unsubscribe();
  }

  onClubSelectedOrDeselected() {
    this.clubSelected.emit(this.selectedSurvey.map(club => club.id));
  }

  onFilterClear() {
    this.clubSelected.emit([]);
  }

  private initSettings() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      unSelectAllText: 'Wyczyść',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  private loadClub() {
    this.clubSubscription = this.clubService.getClubs()
      .subscribe(result => {
        this.clubs = result.content;
      });
  }

}
