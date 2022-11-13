import { Component, OnInit } from '@angular/core';
import { Theme } from './constants/types';
import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  menuStatus: Boolean;
  theme: Theme;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.menuStatus.subscribe((status) => {
      this.menuStatus = status;
    });

    this.globalService.theme.subscribe((theme) => {
      this.theme = theme;
    });
  }

  toggleMenu() {
    this.globalService.toggleMenu();
  }

  toggleTheme() {
    this.globalService.toggleTheme();
  }
}
