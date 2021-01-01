import { Component, OnInit } from "@angular/core";
import { SocketService } from "../services/socket.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"],
})
export class LobbyComponent implements OnInit {
  subscriptions: Array<Subscription> = [];
  constructor(private _socketService: SocketService, private _router: Router) {}

  createRoom() {
    let roomName = prompt("Room name?");
    if (roomName) {
      this._socketService.sendMessage("create-room", roomName);
    }
  }

  joinRoom(room = null) {
    let roomName = room;
    if (!roomName) {
      roomName = prompt("Room name?");
    }
    this._socketService.sendMessage("join-room", roomName);
  }

  getRooms() {
    let roomName = prompt("Room name?");
    this._socketService.sendMessage("get-rooms", roomName);
  }

  broadcast() {
    this._socketService.sendMessage("broadcast", this._socketService.room);
  }

  ngOnInit() {
    this.subscriptions.push(
      this._socketService.notifications().subscribe((msg) => {
        alert(msg);
      })
    );
    this.subscriptions.push(
      this._socketService.roomJoined().subscribe((room) => {
        this._socketService.room = room;
        this._router.navigate(["playground"]);
      })
    );
    this.subscriptions.push(
      this._socketService.roomCreated().subscribe((room) => {
        this.joinRoom(room);
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      if (sub) sub.unsubscribe();
    });
  }
}
