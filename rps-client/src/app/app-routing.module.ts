import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlaygroundComponent } from "./playground/playground.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { TrainComponent } from "./train/train.component";

const routes: Routes = [
  { path: "lobby", component: LobbyComponent },
  { path: "playground", component: PlaygroundComponent },
  { path: "train", component: TrainComponent },
  { path: "", redirectTo: "training", pathMatch: "prefix" },
  { path: "**", redirectTo: "training" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
