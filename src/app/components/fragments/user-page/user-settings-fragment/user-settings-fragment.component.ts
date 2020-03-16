import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  USER_ACCOUNT_TYPES,
  SEARCH_STATUS,
  SEARCH_STATUS_LABELS
} from 'src/app/enums/all.enums';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';
import { PutService } from 'src/app/services/client/put.service';

@Component({
  selector: 'app-user-settings-fragment',
  templateUrl: './user-settings-fragment.component.html',
  styleUrls: ['./user-settings-fragment.component.scss']
})
export class UserSettingsFragmentComponent implements OnInit {
  you: UserModel;
  USER_ACCOUNT_TYPES = USER_ACCOUNT_TYPES;
  SEARCH_STATUS = SEARCH_STATUS;
  SEARCH_STATUS_LABELS = SEARCH_STATUS_LABELS;

  tenantSettingsForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
    bio: new FormControl('', []),
    search_status: new FormControl('', [Validators.required]),
    credit_score: new FormControl(0, [Validators.required]),
    gross_income: new FormControl(0, [Validators.required]),
    net_income: new FormControl(0, [Validators.required]),
    income_sources_count: new FormControl(0, [Validators.required]),
  });

  homeOwnerSettingsForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
    bio: new FormControl('', []),
    search_status: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store<AppState>,
    private PUT: PutService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.store.select('you').subscribe((you: UserModel) => {
      this.handleUserStoreChange(you);
    });
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
    if (!this.you) {
      return;
    }
    if (this.you.account_type === USER_ACCOUNT_TYPES.TENANT) {
      this.tenantSettingsForm.setValue({
        email: this.you.email,
        phone: this.you.phone,
        bio: this.you.bio,
        search_status: this.you.search_status,
        credit_score: this.you.credit_score,
        gross_income: this.you.gross_income,
        net_income: this.you.net_income,
        income_sources_count: this.you.income_sources_count,
      });
    } else {
      this.homeOwnerSettingsForm.setValue({
        email: this.you.email,
        phone: this.you.phone,
        bio: this.you.bio,
        search_status: this.you.search_status,
      });
    }
  }

  onSubmit() {
    const formValue = this.you.account_type === USER_ACCOUNT_TYPES.TENANT
      ?  this.tenantSettingsForm.value
      : this.homeOwnerSettingsForm.value;

    this.PUT.update_profile_settings(formValue, this.you.id)
      .subscribe(
        (response) => {
          console.log(response);
          this.utilityService.showSuccessSnackbar(
            response.message
          );
        },
        (error: HttpErrorResponse) => {
          this.utilityService.showErrorSnackbar(
            error.error.message
          );
        },
      );
  }
}
