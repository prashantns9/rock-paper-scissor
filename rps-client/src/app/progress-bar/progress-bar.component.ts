import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.css"],
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: number = 0; // %out of 100
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.progress > 100) {
      this.progress = 100;
    }
  }
}
