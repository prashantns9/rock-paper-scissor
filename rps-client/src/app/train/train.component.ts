import { Component, OnInit } from "@angular/core";
import { Move } from "../models/move.enum";
import { KnnService } from "../services/knn.service";

@Component({
  selector: "app-train",
  templateUrl: "./train.component.html",
  styleUrls: ["./train.component.css"],
})
export class TrainComponent implements OnInit {
  stream;

  rockProgress: number = 0;
  paperProgress: number = 0;
  scissorProgress: number = 0;

  constructor(private _knnService: KnnService) {}

  addExample(className: Move) {
    this.rockProgress += className === Move.Rock ? 20 : 0;
    this.paperProgress += className === Move.Paper ? 20 : 0;
    this.scissorProgress += className === Move.Scissor ? 20 : 0;
    this._knnService.addExample(className);
  }

  ngOnInit() {
    const webcamElement: HTMLVideoElement = document.getElementById(
      "webcam"
    ) as HTMLVideoElement;

    const constraints = {
      video: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (webcamElement) {
        webcamElement.srcObject = stream;
        this.stream = stream;
      }
    });

    if (webcamElement) {
      this._knnService.addWebCam(webcamElement);
    }
  }

  ngOnDestroy() {
    this.stream.getTracks()[0].stop();
  }
}
