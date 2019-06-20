import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Campaign, CampaignService } from '../../core/campaign';

@Component({
  selector: 'app-campaign-select',
  templateUrl: './campaign-select.component.html',
  styleUrls: ['./campaign-select.component.scss']
})
export class CampaignSelectComponent implements OnInit, OnDestroy {

  campaignsSubscription: Subscription;
  dropdownSettings;
  campaign: Campaign[];
  selectedCampaign;

  @Output() campaignSelected: EventEmitter<number[]> = new EventEmitter();

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit() {
    this.loadCampaigns();
    this.initSettings();
  }

  ngOnDestroy() {
    this.campaignsSubscription.unsubscribe();
  }

  onCampaignSelectedOrDeselected() {
    this.campaignSelected.emit(this.selectedCampaign.map(campaign => campaign.id));
  }

  onSelectAll() {
    this.campaignSelected.emit(this.campaign.map(campaign => campaign.id));
  }

  onFilterClear() {
    this.campaignSelected.emit([]);
  }

  private initSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Wybierz wszystko',
      unSelectAllText: 'Wyczyść',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  private loadCampaigns() {
    this.campaignsSubscription = this.campaignService.getCampaigns()
      .subscribe(result => {
        this.campaign = result.content;
      });
  }

}
