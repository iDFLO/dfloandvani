import { Component, OnInit } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppMedia } from './core/models/app-media';
import { AppMediaService } from './core/services/app-media.service';
import { Countdown } from './models/countdown';

export const JULY = 6;
export const SEPTEMBER = 8;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  weddingDate = new Date(2020, SEPTEMBER, 12, 14, 30);
  showerDate = new Date(2020, JULY, 26, 15, 0);
  showerEndDate = new Date(2020, JULY, 26, 18, 0);
  countdown$: Observable<Countdown>;
  appMedia$ = this.appMediaService.appMedia$;

  public get AppMedia() {
    return AppMedia;
  }

  constructor(private appMediaService: AppMediaService) {}

  ngOnInit(): void {
    this.countdown$ = timer(0, 1000).pipe(
      map(() => {
        const diff = this.weddingDate.getTime() - Date.now();
        return {
          days: Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24))),
          hours: Math.abs(Math.floor((diff / (1000 * 60 * 60)) % 24)),
          mins: Math.abs(Math.floor((diff / (1000 * 60)) % 60)),
          secs: Math.abs(Math.floor((diff / 1000) % 60)),
          suffix: diff > 0 ? 'until we say "I do"' : 'Happily Married!',
        };
      }),
    );
  }
}
