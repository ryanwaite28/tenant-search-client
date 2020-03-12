import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/client/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  USER_ACCOUNT_TYPES,
  USER_ACCOUNT_TYPE_LABELS
} from 'src/app/enums/all.enums';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    middle_initial: new FormControl('', []),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    account_type: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  USER_ACCOUNT_TYPES = USER_ACCOUNT_TYPES;
  USER_ACCOUNT_TYPE_LABELS = USER_ACCOUNT_TYPE_LABELS;

  constructor(
    private router: Router,
    private POST: PostService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.POST.sign_up(this.signupForm.value).subscribe(
      (response) => {
        console.log(response);
        this.utilityService.showSuccessSnackbar(
          response.message
        );
        this.router.navigate(['/', 'users', response.user.id]);
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
