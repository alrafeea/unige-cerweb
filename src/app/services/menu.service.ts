import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { switchMap, map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private db: DbService) {}

  getMenu(): Observable<MenuItem[]> {
    return this.db.collection$(`/menu`).pipe(
      map(result => {
        return MenuItem.fromEntityListResult(result);
      }),
      shareReplay()
    );
  }
}
