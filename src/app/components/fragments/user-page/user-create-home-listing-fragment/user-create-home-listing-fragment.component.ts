import { Component, OnInit } from '@angular/core';
import { UserState } from 'src/app/interfaces/user-state.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { PostService } from 'src/app/services/client/post.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-home-listing-fragment',
  templateUrl: './user-create-home-listing-fragment.component.html',
  styleUrls: ['./user-create-home-listing-fragment.component.css']
})
export class UserCreateHomeListingFragmentComponent implements OnInit {
  user: UserState;
  isEditing = false;

  constructor(
    private store: Store<AppState>,
    private POST: PostService,
    private utilityService: UtilityService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.subscribe((state: AppState) => {
      this.handleStoreChange(state);
    });
  }

  handleStoreChange(state: AppState) {
    this.user = state.user;
  }

  onSubmit(event) {
    console.log(event);
    this.POST.create_home_listing(event.formData, this.user.id).subscribe(
      (response: any) => {
        console.log(response);
        this.utilityService.showSuccessSnackbar(
          response.message
        );
        this.router.navigate(['/', 'users', this.user.id, 'home-listings']);
      },
      (error: HttpErrorResponse) => {
        this.utilityService.showErrorSnackbar(
          error.error.message
        );
      },
    );
  }
}
