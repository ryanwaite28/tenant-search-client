import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { HomeListingRequestModel } from 'src/app/interfaces/home-listing-request.interface';
import { GetService } from 'src/app/services/client/get.service';
import { PutService } from 'src/app/services/client/put.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { TenantRequestsService } from 'src/app/services/tenant-requests.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-home-requests-fragment',
  templateUrl: './user-home-requests-fragment.component.html',
  styleUrls: ['./user-home-requests-fragment.component.scss']
})
export class UserHomeRequestsFragmentComponent implements OnInit {
  you: UserModel;
  tenantRequestsList: HomeListingRequestModel[] = [];
  defaultIconUrl: string;
  didLoad = false;
  isEndOfResults = false;

  constructor(
    private GET: GetService,
    private PUT: PutService,
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
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
    if (!this.didLoad) {
      this.didLoad = true;
      this.loadMoreHomeListingRequests();
    }
  }

  loadMoreHomeListingRequests() {
    const lastIndex = this.tenantRequestsList.length - 1;
    const last = this.tenantRequestsList[lastIndex];
    const minId = last ? last.id : null;

    this.GET.requests_by_tenant_id(this.you.id, minId).subscribe(
      (response) => {
        console.log(response);
        this.isEndOfResults = response.home_listing_requests.length < 5;
        this.tenantRequestsList.push(...response.home_listing_requests);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  declineTenantRequest(tenantRequest) {
    this.setTenantRequestState(tenantRequest, 'decline');
  }

  acceptTenantRequest(tenantRequest) {
    this.setTenantRequestState(tenantRequest, 'accept');
  }

  setTenantRequestState(tenantRequest, state: 'decline' | 'accept') {
    const ask = window.confirm(`Are you sure you want to ${state} this request? You cannot undo this action.`);
    if (!ask) {
      return;
    }
    this.PUT.set_request_accept_state(this.you.id, tenantRequest.id, state)
      .subscribe(
        (response) => {
          console.log(response);
          tenantRequest.accepted = response.accepted;
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
}
