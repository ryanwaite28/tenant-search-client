import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/interfaces/user-model.interface';
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
  you: UserModel;
  isEditing = false;

  constructor(
    private store: Store<AppState>,
    private POST: PostService,
    private utilityService: UtilityService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.select('you').subscribe((you: UserModel) => {
      this.handleUserStoreChange(you);
    });
  }

  handleUserStoreChange(you: UserModel) {
    this.you = you;
  }

  onSubmit(event) {
    console.log(event);
    this.POST.create_home_listing(event.formData, this.you.id).subscribe(
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
