import { Component, OnInit } from '@angular/core';
import { PutService } from 'src/app/services/client/put.service';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { UtilityService } from 'src/app/services/utility.service';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-icon-fragment',
  templateUrl: './user-icon-fragment.component.html',
  styleUrls: ['./user-icon-fragment.component.scss']
})
export class UserIconFragmentComponent implements OnInit {
  user: UserState;

  constructor(
    private store: Store<AppState>,
    private PUT: PutService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.store.subscribe((state: AppState) => {
      this.handleStoreChange(state);
    });
  }

  handleStoreChange(state: AppState) {
    this.user = state.user;
  }

  onSubmit(iconForm: HTMLFormElement) {
    const formData = new FormData(iconForm);
    this.PUT.update_profile_icon(formData, this.user.id).subscribe(
      (response: any) => {
        this.utilityService.showErrorSnackbar(
          response.message
        );
        iconForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
        iconForm.reset();
      }
    );
  }
}
