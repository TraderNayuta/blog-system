import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, Tag } from 'src/app/constants/interfaces';
import { categories, tags } from 'src/app/constants/mock';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  jwtToken: string;
  categories: BehaviorSubject<Category[]> = new BehaviorSubject(categories);
  tags: BehaviorSubject<Tag[]> = new BehaviorSubject(tags);

  setToken(token: string) {
    this.jwtToken = `Bearer ${token}`;
  }

  setCategories(categories: Category[]) {
    this.categories.next(categories);
  }

  setTags(tags: Tag[]) {
    this.tags.next(tags);
  }
}
