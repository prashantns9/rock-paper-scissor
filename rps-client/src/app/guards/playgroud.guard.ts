import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { SocketService } from "../services/socket.service";

@Injectable()
export class PlaygroundGuard implements CanActivate {
  constructor(public router: Router, private _socketService: SocketService) {}

  canActivate(): boolean {
    if (!!this._socketService.room) {
      return true;
    }

    this.router.navigate(["/lobby"]);
    return false;
  }
}
