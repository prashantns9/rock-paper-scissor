import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Move } from "../models/move.enum";
import { Prediction } from "../models/prediction";
import { KnnService } from "../services/knn.service";

@Component({
  selector: "app-predict",
  templateUrl: "./predict.component.html",
  styleUrls: ["./predict.component.css"],
})
export class PredictComponent implements OnInit {
  currentMove: Move;
  interval: any;
  moveProgress: number = 0;
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor(private _knnService: KnnService) {}

  async startPrediction() {
    while (true) {
      const prediction: Prediction = await this._knnService.predict();
      if (prediction) {
        if (prediction.confidence < 1) {
          clearInterval(this.interval);
          this.moveProgress = 0;

          this.currentMove = null;
          this.select.emit(this.currentMove);
        } else {
          if (this.currentMove !== prediction.label) {
            clearInterval(this.interval);
            this.moveProgress = 0;

            this.currentMove = prediction.label;
            this.select.emit(this.currentMove);

            this.interval = setInterval(() => {
              this.moveProgress += 10;
              if (this.moveProgress === 100) {
                this.play.emit();
                clearInterval(this.interval);
                this.moveProgress = 0;

                this.currentMove = null;
                this.select.emit(this.currentMove);
              }
            }, 200);
          }
        }
      }
      //console.log(prediction);
    }
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

    this.startPrediction();
  }
}
