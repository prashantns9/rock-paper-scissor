export class Prediction {
  label: string;
  confidence: Number;

  constructor(l: string, c: Number) {
    this.label = l;
    this.confidence = c;
  }
}
