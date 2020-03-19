import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { PutService } from 'src/app/services/client/put.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-password-fragment',
  templateUrl: './user-password-fragment.component.html',
  styleUrls: ['./user-password-fragment.component.scss']
})
export class UserPasswordFragmentComponent implements OnInit {
  you: UserModel;
  passwordForm = new FormGroup({
    oldpassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
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
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.PUT.update_profile_password(this.passwordForm.value, this.you.id)
      .subscribe(
        (response) => {
          console.log(response);
          this.utilityService.showSuccessSnackbar(
            response.message
          );
          this.passwordForm.reset();
          this.passwordForm.markAsPristine();
        },
        (error: HttpErrorResponse) => {
          this.utilityService.showErrorSnackbar(
            error.error.message
          );
        },
      );
  }
}
