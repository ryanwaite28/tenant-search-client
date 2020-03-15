import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { Store } from '@ngrx/store';
import { PutService } from 'src/app/services/client/put.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeListingModel } from 'src/app/interfaces/home-listing.interface';
import { DeleteService } from 'src/app/services/client/delete.service';

@Component({
  selector: 'app-home-listing-fragment',
  templateUrl: './home-listing-fragment.component.html',
  styleUrls: ['./home-listing-fragment.component.scss']
})
export class HomeListingFragmentComponent implements OnInit {
  @Input() home: HomeListingModel;
  @Input() user: UserModel;
  @Output() deleteClick = new EventEmitter<any>();
  you: UserModel;

  get isOwner(): boolean {
    const match = this.user && this.you && this.user.id === this.you.id;
    return match;
  }

  constructor(
    private store: Store<AppState>,
    private PUT: PutService,
    private DELETE: DeleteService,
    private utilityService: UtilityService,
  ) {}

  ngOnInit() {
    this.store.select('you').subscribe((you: UserModel) => {
      this.handleUserStoreChange(you);
    });
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
  }

  onEditSubmit(event, home: HomeListingModel) {
    this.PUT.update_home_listing(event.formData, this.you.id, home.id).subscribe(
      (response) => {
        this.utilityService.showSuccessSnackbar(
          response.message
        );
        Object.assign(home, response.home_listing);
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
