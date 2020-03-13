import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/interfaces/user-state.interface';
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
  user: UserState;

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.subscribe(state => {
      console.log(state, this);
      this.user = state.user;
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
