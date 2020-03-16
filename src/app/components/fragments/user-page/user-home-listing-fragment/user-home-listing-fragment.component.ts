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
import { TenantRequestsService } from 'src/app/services/tenant-requests.service';
import { PostService } from 'src/app/services/client/post.service';

@Component({
  selector: 'app-user-home-listing-fragment',
  templateUrl: './user-home-listing-fragment.component.html',
  styleUrls: ['./user-home-listing-fragment.component.scss']
})
export class UserHomeListingFragmentComponent implements OnInit {
  you: UserModel;
  home: HomeListingModel;
  possibleTenantsList: UserModel[] = [];
  homeListingId: number;
  defaultIconUrl: string;
  isEndOfResults = false;

  constructor(
    private GET: GetService,
    private POST: PostService,
    private DELETE: DeleteService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private router: Router,
    private tenantsRequestsService: TenantRequestsService,
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
    this.GET.requests_by_home_listing_id(this.homeListingId, null).subscribe(
      (response) => {
        console.log(response);
        this.isEndOfResults = response.home_listing_requests.length < 5;
        this.loadMorePossibleTenants();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  loadMorePossibleTenants() {
    const lastIndex = this.possibleTenantsList.length - 1;
    const last = this.possibleTenantsList[lastIndex];
    const minId = last ? last.id : null;

    this.GET.possible_tenants_by_state(this.homeListingId, minId).subscribe(
      (response) => {
        console.log(response);
        this.isEndOfResults = response.possible_tenants.length < 5;
        response.possible_tenants.forEach((possibleTenant) => {
          this.checktTenantRequest(possibleTenant);
        });
        this.possibleTenantsList.push(...response.possible_tenants);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  checktTenantRequest(possibleTenant: UserModel) {
    const found = this.tenantsRequestsService.get_by_tenant_id(possibleTenant.id);
    (<any> possibleTenant).tenant_request = found;
  }

  sendTenantRequest(possibleTenant) {
    this.POST.send_tenant_request(this.homeListingId, possibleTenant.id)
      .subscribe(
        (response) => {
          console.log(response);
          (<any> possibleTenant).tenant_request = response.tenant_request;
          this.utilityService.showSuccessSnackbar(
            response.message
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.utilityService.showErrorSnackbar(
            error.error.message
          );
        }
      );
  }

  cancelTenantRequest(possibleTenant) {
    this.DELETE.cancel_tenant_request(this.homeListingId, possibleTenant.id)
      .subscribe(
        (response) => {
          console.log(response);
          (<any> possibleTenant).tenant_request = undefined;
          this.utilityService.showSuccessSnackbar(
            response.message
          );
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.utilityService.showErrorSnackbar(
            error.error.message
          );
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
