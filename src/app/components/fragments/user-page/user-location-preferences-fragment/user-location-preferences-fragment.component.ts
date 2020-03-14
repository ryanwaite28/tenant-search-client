import { Component, OnInit, ViewChild } from '@angular/core';
import { DeleteService } from 'src/app/services/client/delete.service';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { Store } from '@ngrx/store';
import { PutService } from 'src/app/services/client/put.service';
import { UtilityService } from 'src/app/services/utility.service';
import { GetService } from 'src/app/services/client/get.service';
import { PostService } from 'src/app/services/client/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { statesNameAndCodeList } from '../../../../_misc/states';
import { groupedCities } from '../../../../_misc/cities';
import { IState } from 'src/app/interfaces/state.interface';
import { MatPaginator, MatSort } from '@angular/material';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { HOME_TYPES, HOME_TYPE_LABELS } from 'src/app/enums/all.enums';

@Component({
  selector: 'app-user-location-preferences-fragment',
  templateUrl: './user-location-preferences-fragment.component.html',
  styleUrls: ['./user-location-preferences-fragment.component.scss']
})
export class UserLocationPreferencesFragmentComponent implements OnInit {
  displayedColumns: string[] = ['state', 'city'];
  user: UserState;
  didLoadLocationPreferences = false;
  statesList = statesNameAndCodeList;
  citiesList = [];
  locationPreferencesList = [];
  HOME_TYPES = HOME_TYPES;
  HOME_TYPE_LABELS = HOME_TYPE_LABELS;
  locationPreferencesForm = new FormGroup({
    state: new FormControl({ value: '', disabled: false }, [Validators.required]),
    city: new FormControl({ value: '', disabled: true }, [Validators.required]),
    home_type: new FormControl({ value: '', disabled: false }, []),
  });

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private POST: PostService,
    private PUT: PutService,
    private DELETE: DeleteService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.store.subscribe((state: AppState) => {
      this.handleStoreChange(state);
    });
    this.locationPreferencesForm.get('state').valueChanges.subscribe(
      (state: IState) => {
        this.handleStateChange(state);
      }
    );
  }

  initTable() {
  }

  handleStoreChange(state: AppState) {
    this.user = state.user;
    if (!this.didLoadLocationPreferences) {
      this.didLoadLocationPreferences = true;
      this.loadLocationPreferences();
    }
  }

  handleStateChange(state: IState) {
    const cityControl = this.locationPreferencesForm.get('city');
    cityControl.setValue('');
    if (state) {
      cityControl.enable();
      const citiesList = groupedCities[state.code];
      this.citiesList = citiesList;
    } else {
      cityControl.disable();
      this.citiesList = [];
    }
  }

  loadLocationPreferences() {
    this.GET.user_location_preferences(this.user.id).subscribe(
      (response: any) => {
        console.log(response);
        this.locationPreferencesList = response.location_preferences;
        this.initTable();
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      }
    );
  }

  onSubmit() {
    if (this.locationPreferencesForm.invalid) {
      return;
    }
    const data = {
      state: this.locationPreferencesForm.value.state.name,
      city: this.locationPreferencesForm.value.city,
      home_type: this.locationPreferencesForm.value.home_type,
    };
    this.POST.create_location_preference(data, this.user.id).subscribe(
      (response: any) => {
        console.log(response);
        this.locationPreferencesList.unshift(response.location_preference);
        this.locationPreferencesForm.reset();
        this.locationPreferencesForm.markAsPristine();
        this.utilityService.showSuccessSnackbar(
          response.message
        );
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      }
    );
  }

  deleteLocationPreference(preference) {
    const { state, city, home_type } = preference;
    const ask = window.confirm(`Are you sure you want to delete: ${city}, ${state} (${home_type})?`);
    if (!ask) {
      return;
    }
    this.DELETE.delete_location_preference(preference, this.user.id).subscribe(
      (response: any) => {
        console.log(response);
        const index = this.locationPreferencesList.indexOf(preference);
        this.locationPreferencesList.splice(index, 1);
        this.utilityService.showSuccessSnackbar(
          response.message
        );
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      }
    );
  }
}
