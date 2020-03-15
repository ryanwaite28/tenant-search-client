import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/interfaces/user-model.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/app-store.interface';
import { GetService } from 'src/app/services/client/get.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  you: UserModel;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.select('you').subscribe((you: UserModel) => {
      this.you = you;
    });
  }

  sign_out(event) {
    this.GET.sign_out().subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/', 'signin']);
      }
    );
  }
}
