import { Move } from "./move.enum";

export class Prediction {
  label: Move;
  confidence: Number;

  constructor(l: Move, c: Number) {
    this.label = l;
    this.confidence = c;
  }
}
