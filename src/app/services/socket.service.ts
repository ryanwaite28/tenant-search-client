import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { ClientService } from './client/client.service';
import { EVENT_TYPES } from '../enums/all.enums';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private io;
  private listenersMap = new Map<number, any>();

  constructor(
    private clientService: ClientService,
  ) {
    const socket = io(this.clientService.DOMAIN);
    this.io = socket;

    socket.on('connect', function(event){
      console.log(event);
    });
    socket.on('disconnect', function(event){
      console.log(event);
    });
  }

  listen(eventName, callbackFn) {
    const listener = this.io.on(eventName, callbackFn);
    console.log({ listener });
  }

  // startListeners(you_id) {
  //   // Tenant Events
  //   const tenantRequestSentEventName = `${you_id}:${EVENT_TYPES.HOME_LISTING_REQUEST_SENT}`;
  //   this.io.on(tenantRequestSentEventName, (data) => {
  //     console.log(data);
  //   });

  //   const tenantRequestCanceledEventName = `${you_id}:${EVENT_TYPES.HOME_LISTING_REQUEST_SENT}`;
  //   this.io.on(tenantRequestCanceledEventName, (data) => {
  //     console.log(data);
  //   });

  //   // Home Owner Events
  //   const tenantRequestAcceptedEventName = `${you_id}:${EVENT_TYPES.HOME_LISTING_REQUEST_SENT}`;
  //   this.io.on(tenantRequestAcceptedEventName, (data) => {
  //     console.log(data);
  //   });

  //   const tenantRequestDeclinedEventName = `${you_id}:${EVENT_TYPES.HOME_LISTING_REQUEST_SENT}`;
  //   this.io.on(tenantRequestDeclinedEventName, (data) => {
  //     console.log(data);
  //   });
  // }
}
