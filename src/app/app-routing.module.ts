import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'chat/:chat/:name', component: ChatRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
