import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  name: string;

  constructor(private router: Router) {
    this.name = '';
  }

  ngOnInit() {
  }

  joinChat(chat) {
    this.router.navigate(['/chat', chat, this.name]);
  }
}
