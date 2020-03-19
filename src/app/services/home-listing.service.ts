import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeListingService {
  event = new Subject();

  constructor(
    private SocketService: SocketService,
  ) { }
}
