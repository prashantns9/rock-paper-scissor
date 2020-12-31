import { Injectable } from "@angular/core";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import { Prediction } from "../models/prediction";

@Injectable({
  providedIn: "root",
})
export class KnnService {
  private classifier;
  private mobilenet;
  private webcam;
  private classes: Array<string> = ["Rock", "Paper", "Scissor"];

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

  async addExample(className: string) {
    if (!this.webcam) return;
    console.log("Adding ", className);
    let classId = this.classes.findIndex((n) => n === className);
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
    if (!this.webcam) return;

    let retVal = null;
    if (this.classifier.getNumClasses() > 0) {
      const img = await this.webcam.capture();

      // Get the activation from mobilenet from the webcam.
      const activation = this.mobilenet.infer(img, "conv_preds");
      // Get the most likely class and confidence from the classifier module.
      const result = await this.classifier.predictClass(activation);

      retVal = new Prediction(
        this.classes[result.label],
        result.confidences[result.label]
      );
      // Dispose the tensor to release the memory.
      img.dispose();
    }

    await tf.nextFrame();
    return retVal;
  }
}
