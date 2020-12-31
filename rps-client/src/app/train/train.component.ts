import { Component, OnInit } from "@angular/core";
import { KnnService } from "../services/knn.service";

@Component({
  selector: "app-train",
  templateUrl: "./train.component.html",
  styleUrls: ["./train.component.css"],
})
export class TrainComponent implements OnInit {
  constructor(private _knnService: KnnService) {}

  ngOnInit() {
    const webcamElement: HTMLVideoElement = document.getElementById(
      "webcam"
    ) as HTMLVideoElement;

    const constraints = {
      video: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      webcamElement.srcObject = stream;
    });
    this._knnService.addWebCam(webcamElement);
  }
}
