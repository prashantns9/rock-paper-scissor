import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { PlaygroundComponent } from "./playground/playground.component";
import { AppRoutingModule } from "./app-routing.module";
import { LobbyComponent } from "./lobby/lobby.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { PredictComponent } from "./predict/predict.component";
import { TrainComponent } from "./train/train.component";

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    LobbyComponent,
    ProgressBarComponent,
    PredictComponent,
    TrainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
