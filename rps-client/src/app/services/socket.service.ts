import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private _socket = io(environment.socketUrl);
  private _room = '';

  constructor() { }

  get room(){
    return this._room;
  }

  set room(roomName: string){
    this._room = roomName;
  }

  sendMessage(msg: string, data: any) {
    this._socket.emit(msg, data);
  }

  notifications(): Observable<string> {
    let observable = new Observable<string>(observer => {
      this._socket.on('notification', data => {
        observer.next(data);
      });
      return () => { this._socket.disconnect() }
    });
    return observable;
  }

  roomJoined(): Observable<string> {
    let observable = new Observable<string>(observer => {
      this._socket.on('room-joined', data => {
        observer.next(data);
      });
      return () => { this._socket.disconnect() }
    });
    return observable;
  }

  roomCreated(): Observable<string> {
    let observable = new Observable<string>(observer => {
      this._socket.on('room-created', data => {
        observer.next(data);
      });
      return () => { this._socket.disconnect() }
    });
    return observable;
  }

  startGame(): Observable<string> {
    let observable = new Observable<string>(observer => {
      this._socket.on('start-game', data => {
        observer.next(data);
      });
      return () => { this._socket.disconnect() }
    });
    return observable;
  }
  
  opponentMove(): Observable<string> {
    let observable = new Observable<string>(observer => {
      this._socket.on('made-a-move', data => {
        observer.next(data);
      });
      return () => { this._socket.disconnect() }
    });
    return observable;
  }
}
