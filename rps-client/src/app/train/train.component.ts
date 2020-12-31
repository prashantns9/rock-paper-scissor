import { Component, OnInit } from "@angular/core";
import { KnnService } from "../services/knn.service";

@Component({
  selector: "app-train",
  templateUrl: "./train.component.html",
  styleUrls: ["./train.component.css"],
})
export class TrainComponent implements OnInit {
  rockProgress: number = 0;
  paperProgress: number = 0;
  scissorProgress: number = 0;

  constructor(private _knnService: KnnService) {}

  addExample(className: string) {
    this.rockProgress += className === "Rock" ? 20 : 0;
    this.paperProgress += className === "Paper" ? 20 : 0;
    this.scissorProgress += className === "Scissor" ? 20 : 0;
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
      }
    });

    if (webcamElement) {
      this._knnService.addWebCam(webcamElement);
    }
  }
}
