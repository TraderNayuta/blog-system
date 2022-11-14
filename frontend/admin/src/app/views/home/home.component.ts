import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/constants/types';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  theme: Theme;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.theme.subscribe((theme) => {
      this.theme = theme;
    });
  }

  toggleTheme() {
    this.globalService.toggleTheme();
  }
}
