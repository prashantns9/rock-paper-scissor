import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  public webcamElement: HTMLVideoElement;

  constructor() {}
}
