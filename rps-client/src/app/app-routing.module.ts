import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlaygroundComponent } from "./playground/playground.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { TrainComponent } from "./train/train.component";

const routes: Routes = [
  { path: "lobby", component: LobbyComponent },
  { path: "playground", component: PlaygroundComponent },
  { path: "train", component: TrainComponent },
  { path: "", redirectTo: "train", pathMatch: "prefix" },
  { path: "**", redirectTo: "train" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
