import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/client/post.service';
import { PutService } from 'src/app/services/client/put.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss']
})
export class PasswordResetPageComponent implements OnInit {
  sendResetForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  confirmCodeForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  constructor(
    private POST: PostService,
    private PUT: PutService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
  }

  onSendSubmit() {
    if (this.sendResetForm.invalid) {
      return;
    }
    this.POST.submit_reset_password_request(this.sendResetForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.utilityService.showSuccessSnackbar(
            response.message
          );
          this.sendResetForm.reset();
          this.sendResetForm.markAsPristine();
        },
        (error: HttpErrorResponse) => {
          this.utilityService.showErrorSnackbar(
            error.error.message
          );
        },
      );
  }

  onConfirmSubmit() {
    if (this.confirmCodeForm.invalid) {
      return;
    }
    this.PUT.submit_password_reset_code(this.confirmCodeForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.utilityService.showSuccessSnackbar(
            response.message
          );
          this.confirmCodeForm.reset();
          this.confirmCodeForm.markAsPristine();
        },
        (error: HttpErrorResponse) => {
          this.utilityService.showErrorSnackbar(
            error.error.message
          );
        },
      );
  }
}
