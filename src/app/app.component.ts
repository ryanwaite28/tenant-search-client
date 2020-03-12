import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserState } from './interfaces/user-state.interface';
import { Store } from '@ngrx/store';
import { AppState } from './interfaces/app-store.interface';
import { GetService } from './services/client/get.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tenant-search-client';

  constructor(
    private store: Store<AppState>,
    private GET: GetService,
    private router: Router
  ) { }

  ngOnInit() {
    this.GET.checkSession().subscribe(
      (response) => {
        console.log(response);
        if (response.online) {
          this.router.navigate(['/', 'users', response.user.id]);
        }
      }
    );
  }
}
