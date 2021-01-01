import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlaygroundComponent } from "./playground/playground.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { TrainComponent } from "./train/train.component";
import { PlaygroundGuard } from "./guards/playgroud.guard";
import { LobbyGuard } from "./guards/lobby.guard";

const routes: Routes = [
  { path: "lobby", component: LobbyComponent, canActivate: [LobbyGuard] },
  {
    path: "playground",
    component: PlaygroundComponent,
    canActivate: [PlaygroundGuard],
  },
  { path: "train", component: TrainComponent },
  { path: "", redirectTo: "train", pathMatch: "prefix" },
  { path: "**", redirectTo: "train" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
