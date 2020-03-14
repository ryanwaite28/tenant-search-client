import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LEASE_TYPES, HOME_TYPES, HOME_TYPE_LABELS } from 'src/app/enums/all.enums';
import { statesNameAndCodeList } from 'src/app/_misc/states';
import { IState } from 'src/app/interfaces/state.interface';
import { groupedCities } from 'src/app/_misc/cities';

@Component({
  selector: 'app-home-listing-form-fragment',
  templateUrl: './home-listing-form-fragment.component.html',
  styleUrls: ['./home-listing-form-fragment.component.scss']
})
export class HomeListingFormFragmentComponent implements OnInit {
  @Input() isEditing: boolean;
  @Input() homeListing;
  @Output() changesSubmitted = new EventEmitter<any>();

  HOME_TYPES = HOME_TYPES;
  HOME_TYPE_LABELS = HOME_TYPE_LABELS;
  statesList = statesNameAndCodeList;
  citiesList = [];
  LEASE_TYPES = LEASE_TYPES;
  homeListingForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    amenities: new FormControl('', []),
    home_type: new FormControl({ value: '', disabled: false }, [Validators.required]),
    links: new FormControl('', []),
    deposit: new FormControl(0, [Validators.required]),
    rent: new FormControl(0, [Validators.required]),
    lease_type: new FormControl('', [Validators.required]),
    lease_duration: new FormControl(0, [Validators.required]),
    street: new FormControl('', [Validators.required]),
    street_cont: new FormControl('', []),
    city: new FormControl({ value: '', disabled: true }, [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', []),
  });

  constructor() { }

  ngOnInit() {
    if (this.homeListing) {
      this.homeListingForm.setValue({
        title: this.homeListing.title,
        description: this.homeListing.description,
        amenities: this.homeListing.amenities,
        home_type: this.homeListing.home_type,
        links: this.homeListing.links,
        deposit: this.homeListing.deposit,
        rent: this.homeListing.rent,
        lease_type: this.homeListing.lease_type,
        lease_duration: this.homeListing.lease_duration,
        street: this.homeListing.street,
        street_cont: this.homeListing.street_cont,
        city: this.homeListing.city,
        state: this.homeListing.state,
        zipcode: this.homeListing.zipcode,
      });
    }
    this.homeListingForm.get('state').valueChanges.subscribe(
      (state: IState) => {
        this.handleStateChange(state);
      }
    );
  }

  handleStateChange(state: IState) {
    const cityControl = this.homeListingForm.get('city');
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

  submitChange(formElm: HTMLFormElement, pictureInput: HTMLInputElement) {
    if (this.homeListingForm.invalid) {
      return;
    }
    const data = !this.isEditing
      ? {
          ...this.homeListingForm.value,
          state: this.homeListingForm.value.state.name
        }
      : {
          title: this.homeListingForm.value.title,
          description: this.homeListingForm.value.description,
          amenities: this.homeListingForm.value.amenities,
          links: this.homeListingForm.value.links,
          deposit: this.homeListingForm.value.deposit,
          rent: this.homeListingForm.value.rent,
          lease_type: this.homeListingForm.value.lease_type,
          lease_duration: this.homeListingForm.value.lease_duration,
        };
    const formData = new FormData();
    const keys = Object.keys(data);
    for (const key of keys) {
      const value = data[key];
      formData.append(key, value);
    }
    formData.append('picture_file', pictureInput.files[0]);

    const emitObj = {
      formElm,
      formData,
      data,
      valid: this.homeListingForm.valid,
      successCallback: () => {
        this.homeListingForm.reset();
        this.homeListingForm.markAsPristine();
        formElm.reset();
      }
    };

    this.changesSubmitted.emit(emitObj);
  }
}
