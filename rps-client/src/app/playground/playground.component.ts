import { Component, OnInit } from "@angular/core";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-playground",
  templateUrl: "./playground.component.html",
  styleUrls: ["./playground.component.css"],
})
export class PlaygroundComponent implements OnInit {
  gameStarted = false;
  gameOver = false;
  newGameTimer = 5;
  moveOptionSelected = null;
  moveOptions = [
    { label: "Rock", value: 0 },
    { label: "Paper", value: 1 },
    { label: "Scissor", value: 2 },
  ];
  playersMove = null;
  playerHasMoved = false;
  opponentsMove = null;
  opponentHasMoved = false;
  result = "";
  subResult = "";

  constructor(private _socketService: SocketService) {
    this._socketService.notifications().subscribe((msg) => {
      //alert(msg);
    });
    this._socketService.startGame().subscribe((msg) => {
      console.log(msg);
      this.gameStarted = true;
    });
    this._socketService.opponentMove().subscribe((move) => {
      this.opponentsMove = move;
      this.opponentHasMoved = true;
      this.calculateResult();
    });
  }

  makeAMove() {
    if (this.moveOptionSelected !== null) {
      let moveToMake = this.moveOptionSelected;
      let roomToSend = this._socketService.room;
      let dataToSend = {
        move: moveToMake,
        room: roomToSend,
      };
      this._socketService.sendMessage("make-a-move", dataToSend);
      this.playersMove = moveToMake;
      this.playerHasMoved = true;
    }
    this.calculateResult();
  }

  selectOption(option) {
    this.moveOptionSelected = option.value;
  }

  calculateResult() {
    if (this.playerHasMoved && this.opponentHasMoved) {
      if (this.playersMove === 0 && this.opponentsMove === 2) {
        this.result = "You have won.";
      } else if (this.opponentsMove === 0 && this.playersMove === 2) {
        this.result = "Opponent has won.";
      } else if (this.playersMove > this.opponentsMove) {
        this.result = "You have won.";
      } else if (this.playersMove < this.opponentsMove) {
        this.result = "Opponent has won.";
      } else {
        this.result = "Its a tie.";
      }
      this.subResult =
        "Opponent chose " + this.moveOptions[this.opponentsMove].label;
      this.gameOver = true;
      let interval = setInterval(() => {
        this.newGameTimer -= 1;
        if (this.newGameTimer === 0) {
          this.initPlayground();
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  initPlayground() {
    this.newGameTimer = 5;
    this.gameOver = false;
    this.moveOptionSelected = null;
    this.playersMove = null;
    this.playerHasMoved = false;
    this.opponentsMove = null;
    this.opponentHasMoved = false;
    this.result = "";
    this.subResult = "";
  }

  ngOnInit() {
    this.initPlayground();
    this._socketService.sendMessage("player-in-game", this._socketService.room);
  }
}
