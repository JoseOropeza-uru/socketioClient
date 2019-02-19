import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.css"]
})
export class ChatRoomComponent implements OnInit {
  messages = [];
  nickname = "";
  chat = "";
  message = "";
  msgConn;
  usersConn;
  users = [];
  showName;
  toastMsg: string;

  constructor(private route: ActivatedRoute, private socket: Socket) {
    this.msgConn = this.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    });

    this.usersConn = this.getUsers().subscribe(data => {
      console.log(data);

      this.users = data["users"]

      let user = data["nickname"];
      if (data["event"] === "left") {
        this.toastMsg = `${user} left`;
      } else {
        this.toastMsg = `${user} joined`;
      }
      this.showName = "show";
      setTimeout(() => {
        this.showName = "";
      }, 2000);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.nickname = params["params"].name;
      this.chat = params["params"].chat;
      this.messages = [];
      this.socket.connect();
      this.socket.emit("open-chat", {
        nickname: this.nickname,
        room: this.chat
      });
    });
  }

  ngOnDestroy() {
    console.log("bye");
    this.socket.disconnect();
    this.usersConn.unsubscribe();
    this.msgConn.unsubscribe();
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on("in-chat", data => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage() {
    this.socket.emit("send-msg", { text: this.message });
    this.message = "";
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on("message", data => {
        observer.next(data);
      });
    });
    return observable;
  }
}
