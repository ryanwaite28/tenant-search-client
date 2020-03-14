import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { PutService } from 'src/app/services/client/put.service';
import { DeleteService } from 'src/app/services/client/delete.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-home-listings-fragment',
  templateUrl: './user-home-listings-fragment.component.html',
  styleUrls: ['./user-home-listings-fragment.component.scss']
})
export class UserHomeListingsFragmentComponent implements OnInit {
  user: UserState;
  didLoad = false;
  homeListingsList = [];

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private PUT: PutService,
    private DELETE: DeleteService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.store.subscribe((state: AppState) => {
      this.handleStoreChange(state);
    });
  }

  handleStoreChange(state: AppState) {
    this.user = state.user;
    if (!this.didLoad) {
      this.didLoad = true;
      this.GET.user_home_listings(this.user.id).subscribe(
        (response: any) => {
          console.log(response);
          response.home_listings.forEach((home) => {
            home.linksList = this.utilityService.convertHomeListingLinksToList(home.links);
          });
          this.homeListingsList = response.home_listings;
        }
      );
    }
  }

  deleteHomeListing(home) {
    const ask = window.confirm(`Are you sure you want to delete this home listing?`);
    if (!ask) {
      return;
    }
    this.DELETE.delete_home_listing(home, this.user.id).subscribe(
      (response: any) => {
        console.log(response);
        this.utilityService.showSuccessSnackbar(
          response.message
        );
        const index = this.homeListingsList.indexOf(home);
        this.homeListingsList.splice(index, 1);
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      },
    );
  }

  onEditSubmit(event, home) {
    console.log(event, home);
    this.PUT.update_home_listing(event.formData, this.user.id, home.id).subscribe(
      (response: any) => {
        console.log(response);
        this.utilityService.showSuccessSnackbar(
          response.message
        );
        Object.assign(home, response.updatesObj);
        home.linksList = this.utilityService.convertHomeListingLinksToList(home.links);
        home.isEditing = false;
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      },
    );
  }
}
