import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PutService } from 'src/app/services/client/put.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  error = null;
  errorMessage: string;

  constructor(
    private router: Router,
    private PUT: PutService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.error = null;
    this.PUT.sign_in(this.signinForm.value).subscribe(
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
