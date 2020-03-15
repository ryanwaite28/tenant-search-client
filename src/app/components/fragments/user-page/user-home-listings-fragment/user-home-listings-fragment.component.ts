import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { PutService } from 'src/app/services/client/put.service';
import { DeleteService } from 'src/app/services/client/delete.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeListingModel } from 'src/app/interfaces/home-listing.interface';

@Component({
  selector: 'app-user-home-listings-fragment',
  templateUrl: './user-home-listings-fragment.component.html',
  styleUrls: ['./user-home-listings-fragment.component.scss']
})
export class UserHomeListingsFragmentComponent implements OnInit {
  you: UserModel;
  didLoad = false;
  homeListingsList: HomeListingModel[] = [];

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private PUT: PutService,
    private DELETE: DeleteService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.store.select('you').subscribe((you: UserModel) => {
      this.handleUserStoreChange(you);
    });
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
    if (!this.didLoad) {
      this.didLoad = true;
      this.GET.user_home_listings(this.you.id).subscribe(
        (response) => {
          console.log(response);
          response.home_listings.forEach((home) => {
            home.linksList = this.utilityService.convertHomeListingLinksToList(home.links);
          });
          this.homeListingsList = response.home_listings;
        }
      );
    }
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
}
