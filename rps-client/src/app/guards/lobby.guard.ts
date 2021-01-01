import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { KnnService } from "../services/knn.service";

@Injectable()
export class LobbyGuard implements CanActivate {
  constructor(public router: Router, private _knnService: KnnService) {}

  canActivate(): boolean {
    if (this._knnService.isReady()) {
      return true;
    }

    this.router.navigate(["/train"]);
    return false;
  }
}
