import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { MainPageComponent } from './main-page/main-page.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import {FormsModule} from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChatRoomComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
