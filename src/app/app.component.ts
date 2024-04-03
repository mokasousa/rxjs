import { Component, OnInit } from '@angular/core';
import { interval, map, mapTo, merge, mergeAll, of, pairwise, race, startWith, take, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs';

  ngOnInit(): void {

  }

  protected onMerge(): void {
    const a = interval(3000).pipe(map(() => 'A'));
    const b = interval(1000).pipe(map(() => 'B'));
    const c = interval(2000).pipe(map(() => 'C'));
    const d = interval(1000).pipe(map(() => 'D'));

    merge(a, b, c, d).subscribe((data) => console.log(`${data}`, 'color: green'));
  }

  protected onMergeAll(): void {
    // merge observables that produce values independently and are short-lived
    const a = interval(3000).pipe(map(() => 'A'), take(1));
    const b = interval(1000).pipe(map(() => 'B'), take(2));
    const c = interval(2000).pipe(map(() => 'C'), take(3));
    const d = interval(1000).pipe(map(() => 'D'), take(4));

    of(a, b, c, d)
    .pipe(
      mergeAll(2)
    ).subscribe((data) => console.log(`${data}`, 'color: green'));
  }

  protected onPairwise(): void {
    interval(1000)
    .pipe(
      map((_, index) => console.log(`Emissão ${index}`)),
      pairwise(), 
      take(5)
    )
    .subscribe((data) => console.log(`${data}`, 'color: red'));
  }

  protected onRace(): void {
    const a = interval(3000).pipe(map(() => 'A'));
    const b = interval(1000).pipe(map(() => 'B'));
    const c = interval(2000).pipe(map(() => 'C'));
    const d = interval(1000).pipe(map(() => 'D'));

    race(a, b, c, d).subscribe((data) => console.log(`${data}`, 'color: green'));
  }

  protected onStartWith(): void {
    //set a default state or value for your observables
    const a = interval(3000).pipe(map(() => 'A'));
    const b = interval(1000).pipe(map(() => 'B'));
    const c = interval(2000).pipe(map(() => 'C'));
    const d = interval(1000).pipe(map(() => 'D'));

    merge(a, b, c, d).pipe(startWith('X')).subscribe((data) => console.log(`${data}`, 'color: green'));
  }

  protected onWithLatestFrom(): void {
    const a = interval(3000).pipe(map(() => 'A'));
    const b = interval(1000).pipe(map(() => 'B'));

    a.pipe(withLatestFrom(b)).subscribe((data) => console.log(`${data}`, 'color: green'));
  }
}
