import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GetService } from 'src/app/services/client/get.service';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from 'src/app/interfaces/user-model.interface';

@Component({
  selector: 'app-verify-account-page',
  templateUrl: './verify-account-page.component.html',
  styleUrls: ['./verify-account-page.component.scss']
})
export class VerifyAccountPageComponent implements OnInit {
  checked = false;
  message = '';
  user: UserModel;
  welcomeWallpaper: string;

  constructor(
    private GET: GetService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.GET.checkUserSession().subscribe((user: UserModel) => {
      this.user = user;
      console.log(user);
    });

    this.route.params.subscribe((params: Params) => {
      this.handleParamsChange(params);
    });
  }

  handleParamsChange(params: Params) {
    console.log(params);
    const code = params.verify_code;
    this.GET.verify_account(code)
    .subscribe(
      (response) => {
        console.log(response);
        this.message = response.message;
      },
      (error: HttpErrorResponse) => {
        this.message = error.error.message;
      },
    );
  }
}
