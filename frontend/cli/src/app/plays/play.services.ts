import { Injectable, PLATFORM_ID } from '@angular/core';
import { Play } from './play';
import { PLAYS } from './mock-plays';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayService {

  constructor() {}

  get(id: number): Observable<Play>{
    return of(PLAYS.find(play => play.id === id)!); /* ! es un modificador de angular para simeore devuelva un play*/
  }

  save (play: Play) : Observable<Play>{
    let formerPlay = PLAYS.find((formerPlay) => formerPlay.id === play.id)!;
    Object.assign(formerPlay, play);
    return of(formerPlay);
  }
}
