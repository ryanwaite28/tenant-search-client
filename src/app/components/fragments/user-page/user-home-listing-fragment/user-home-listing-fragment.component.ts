import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { PutService } from 'src/app/services/client/put.service';
import { DeleteService } from 'src/app/services/client/delete.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HomeListingModel } from 'src/app/interfaces/home-listing.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationPreferenceModel } from 'src/app/interfaces/location-preference.interface';
import { HomeListingRequestModel } from 'src/app/interfaces/home-listing-request.interface';

@Component({
  selector: 'app-user-home-listing-fragment',
  templateUrl: './user-home-listing-fragment.component.html',
  styleUrls: ['./user-home-listing-fragment.component.scss']
})
export class UserHomeListingFragmentComponent implements OnInit {
  you: UserModel;
  home: HomeListingModel;
  homeListingRequestsList: HomeListingRequestModel[] = [];
  locationPreferencesList: LocationPreferenceModel[] = [];
  homeListingId: number;
  defaultIconUrl: string;
  isEndOfResults = false;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private DELETE: DeleteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.defaultIconUrl = this.GET.defaultIconUrl;
    this.store.select('you').subscribe((you: UserModel) => {
      this.handleUserStoreChange(you);
    });
    this.homeListingId = parseInt(this.route.snapshot.params.home_listing_id, 10);
    this.GET.home_listing_by_id(this.homeListingId).subscribe(
      (response) => {
        console.log(response);
        this.home = response.home_listing;
        this.home.linksList = this.utilityService.convertHomeListingLinksToList(this.home.links);
        this.loadHomeListingRequests();
        this.loadMoreResults();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
  }

  loadHomeListingRequests() {
    this.GET.requests_by_home_listing_id(this.homeListingId).subscribe(
      (response) => {
        console.log(response);
        this.isEndOfResults = response.home_listing_requests.length < 5;
        this.homeListingRequestsList = response.home_listing_requests;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  loadMoreResults() {
    const lastIndex = this.locationPreferencesList.length - 1;
    const last = this.locationPreferencesList[lastIndex];
    const minId = last ? last.id : null;

    this.GET.location_preferences_by_state(this.homeListingId, minId).subscribe(
      (response) => {
        console.log(response);
        this.isEndOfResults = response.location_preferences.length < 5;
        this.locationPreferencesList.push( ...response.location_preferences );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  deleteHomeListing(home: HomeListingModel) {
    const ask = window.confirm(`Are you sure you want to delete this home listing?`);
    if (!ask) {
      return;
    }
    this.DELETE.delete_home_listing(home, this.you.id).subscribe(
      (response) => {
        console.log(response);
        this.utilityService.showSuccessSnackbar(
          response.message
        );
        this.router.navigate(['/', 'users', this.you.id, 'home-listings']);
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      },
    );
  }
}
