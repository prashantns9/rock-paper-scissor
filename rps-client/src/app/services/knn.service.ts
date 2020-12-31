import { Injectable } from "@angular/core";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Prediction } from "../models/prediction";
import { Move } from "../models/move.enum";

@Injectable({
  providedIn: "root",
})
export class KnnService {
  private classifier;
  private mobilenet;
  private webcam;

  constructor() {
    this.init();
  }

  async init() {
    console.log("Loading Mobilenet");
    this.mobilenet = await mobilenet.load();
    console.log("Creating classifier");
    this.classifier = knnClassifier.create();
  }

  async addWebCam(webcamElement: HTMLVideoElement) {
    console.log("Added Webcam");
    this.webcam = await tf.data.webcam(webcamElement);
  }

  async addExample(classId: Move) {
    if (!this.webcam) return;
    // Capture an image from the web camera.
    const img = await this.webcam.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = this.mobilenet.infer(img, true);

    // Pass the intermediate activation to the classifier.
    this.classifier.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  }

  async predict() {
    let retVal = null;
    if (this.webcam && this.classifier && this.classifier.getNumClasses() > 0) {
      const img = await this.webcam.capture();

      // Get the activation from mobilenet from the webcam.
      const activation = this.mobilenet.infer(img, "conv_preds");
      // Get the most likely class and confidence from the classifier module.
      const result = await this.classifier.predictClass(activation);

      retVal = new Prediction(
        parseInt(result.label),
        result.confidences[result.label]
      );
      // Dispose the tensor to release the memory.
      img.dispose();
    }

    await tf.nextFrame();
    return retVal;
  }
}
