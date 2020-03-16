import { Injectable } from '@angular/core';
import { HomeListingRequestModel } from '../interfaces/home-listing-request.interface';
import { Subject } from 'rxjs';
import { copyObj } from '../_misc/clone-object';

export interface HomeListingsRequestsChange {
  event: 'add' | 'edit' | 'remove' | 'clear';
  homeListingRequest?: HomeListingRequestModel;
  homeListingRequests?: HomeListingRequestModel[];
}

@Injectable({
  providedIn: 'root'
})
export class HomeListingsRequestsService {
  private homeListingsRequestsList: HomeListingRequestModel[] = [];
  changes = new Subject<HomeListingsRequestsChange>();

  constructor() {}

  getAll(): HomeListingRequestModel[] {
    return copyObj(this.homeListingsRequestsList);
  }

  get(id: number) {
    const found = this.homeListingsRequestsList.find(
      (homeListingRequest) => homeListingRequest.id === id
    );
    return found ? copyObj(found) : null;
  }

  add(homeListingRequest: HomeListingRequestModel) {
    const found = this.homeListingsRequestsList.find(
      (h) => h.id === homeListingRequest.id
    );
    if (!found) {
      this.homeListingsRequestsList.push(homeListingRequest);
      this.changes.next({
        event: 'add',
      });
    }
  }

  addBatch(homeListingRequests: HomeListingRequestModel[]) {
    const priorLength = this.homeListingsRequestsList.length;
    homeListingRequests.forEach((h) => {
      const found = this.homeListingsRequestsList.find(
        (homeListingRequest) => homeListingRequest.id === h.id
      );
      if (!found) {
        this.homeListingsRequestsList.push(h);
      }
    });
    const newLength = this.homeListingsRequestsList.length;

    if (priorLength !== newLength) {
      this.changes.next({
        event: 'add',
      });
    }
  }

  edit(homeListingRequest: HomeListingRequestModel) {
    const found = this.homeListingsRequestsList.find(
      (h) => h.id === homeListingRequest.id
    );
    if (found) {
      Object.assign(found, homeListingRequest);
      this.changes.next({
        event: 'edit',
      });
    }
  }

  remove(homeListingRequest: HomeListingRequestModel) {
    const index = this.homeListingsRequestsList.findIndex(
      (h) => h.id === homeListingRequest.id
    );
    if (index > -1) {
      this.homeListingsRequestsList.splice(index, 1);
      this.changes.next({
        event: 'remove'
      });
    }
  }

  clear() {
    this.homeListingsRequestsList = [];
    this.changes.next({
      event: 'clear'
    });
  }
}
