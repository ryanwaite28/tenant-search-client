import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { GetService } from 'src/app/services/client/get.service';
import { PostService } from 'src/app/services/client/post.service';
import { DeleteService } from 'src/app/services/client/delete.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { TenantRequestsService } from 'src/app/services/tenant-requests.service';
import { HomeListingRequestModel } from 'src/app/interfaces/home-listing-request.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-tenant-requests-fragment',
  templateUrl: './user-tenant-requests-fragment.component.html',
  styleUrls: ['./user-tenant-requests-fragment.component.scss']
})
export class UserTenantRequestsFragmentComponent implements OnInit {
  you: UserModel;
  tenantRequestsList: HomeListingRequestModel[] = [];
  defaultIconUrl: string;
  didLoad = false;
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

    this.GET.requests_by_home_owner_id(this.you.id, minId).subscribe(
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

  cancelTenantRequest(tenantRequest: HomeListingRequestModel) {
    const ask = window.confirm(`Are you sure you want to cancel this tenant request?`);
    if (!ask) {
      return;
    }
    this.DELETE.cancel_tenant_request(tenantRequest.home_listing_id, tenantRequest.tenant_id)
      .subscribe(
        (response) => {
          console.log(response);
          const index = this.tenantRequestsList.indexOf(tenantRequest);
          this.tenantRequestsList.splice(index, 1);
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
