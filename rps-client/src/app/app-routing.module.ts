import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
    {path: 'lobby', component: LobbyComponent},
    {path: 'playground', component: PlaygroundComponent},
    {path: '', redirectTo: 'lobby', pathMatch: 'prefix'},
    {path: '**', redirectTo: 'lobby'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }