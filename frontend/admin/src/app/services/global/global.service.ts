import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from 'src/app/constants/types';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  theme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('light');

  constructor() {}

  toggleTheme() {
    this.theme.next(this.theme.getValue() === 'light' ? 'dark' : 'light');
  }
}
