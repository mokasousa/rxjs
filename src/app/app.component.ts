import { Component, OnInit } from '@angular/core';
import { finalize, fromEvent, interval, map, merge, mergeAll, pairwise, race, startWith, take, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs';

  ngOnInit(): void {
    // this.onMerge();
    // this.onMergeAll();
    // this.onPairwise();
    // this.onRace();
    // this.onStartWith();
    // this.onWithLatestFrom();
  }

  protected onMerge(): void {
    const a = interval(3000).pipe(map(() => `A`), take(2));
    const b = interval(1000).pipe(map(() => `B`), take(2));
    const c = interval(2000).pipe(map(() => `C`), take(2));
    const d = interval(1000).pipe(map(() => `D`), take(2));

    merge(a, b, c, d)
    .pipe(tap((data) => console.log(`emit ${data}`)))
    .subscribe((data) => console.log(`result ${data}`));
  }

  protected onMergeAll(): void {
    const a = interval(3000).pipe(map(() => `A`), take(3));
    const b = interval(1000).pipe(map(() => `B`), take(3));

    a
    .pipe(
      tap((data) => console.log(`emit ${data}`)),
      map(() => b),
      mergeAll()
    ).subscribe((data) => console.log(`result ${data}`));

    fromEvent(document, 'click')
    .pipe(
      tap(() => console.log('click')),
      map(() => interval(1000).pipe(take(3))),
      mergeAll(2)
    ).subscribe((data) => console.log(`result ${data}`));
  }

  protected onPairwise(): void {
    interval(3000).pipe(take(4))
    .pipe(
      tap((data) => console.log(`emit ${data}`)),
      pairwise(),
    )
    .subscribe((data) => console.log(`result ${data[0]} e ${data[1]}`));

    fromEvent(document, 'click')
    .pipe(
      tap(() => console.log('click')),
      pairwise(),
    ).subscribe((data: any) => {
      const position1: PointerEvent = data[0];
      const position2: PointerEvent = data[1];
      console.log(`result ${position1.clientX} and ${position2.clientX}`);
    });
  }

  protected onRace(): void {
    const a = interval(3000).pipe(map(() => `A`), take(2), finalize(() => `end A`));
    const b = interval(1000).pipe(map(() => `B`), take(2), finalize(() => `end B`));
    const c = interval(2000).pipe(map(() => `C`), take(2), finalize(() => `end C`));
    const d = interval(1000).pipe(map(() => `D`), take(2), finalize(() => `end D`));

    race(a, b, c, d)
    .pipe(tap((data) => console.log(`emit ${data}`)))
    .subscribe({
      next: (data) => console.log(`result ${data}`),
      complete: () => console.log(`complete`),
    });
  }

  protected onStartWith(): void {
    const a = interval(3000).pipe(map(() => 'A'), take(2));
    const b = interval(1000).pipe(map(() => 'B'), take(2));
    const c = interval(2000).pipe(map(() => 'C'), take(2));
    const d = interval(1000).pipe(map(() => 'D'), take(2));

    merge(a, b, c, d)
    .pipe(
      tap((data) => console.log(`emit ${data}`)),
      startWith('N')
    ).subscribe((data) => console.log(`result ${data}`));
  }

  protected onWithLatestFrom(): void {
    const a = interval(3000).pipe(map((data) => `A${data}`), take(4));
    const b = interval(1000).pipe(map((data) => `B${data}`));

    a
    .pipe(
      tap((data) => console.log(`emit ${data}`)),
      withLatestFrom(b)
    )
    .subscribe((data) => console.log(`result ${data[0]} and ${data[1]}`));
  }
}
