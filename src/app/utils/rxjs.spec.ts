import { interval, never, Observable, Observer } from 'rxjs';
import { takeUntil, takeWhile, switchMap, map } from 'rxjs/operators';

const obj = {
  0: '000',
  1: '111',
  2: '222'
};

describe('RxJS', () => {
  //   it('takeWhile to complete intervalObservable', () => {
  //     interval(1000)
  //       .pipe(
  //         map(val => obj[val]),
  //         takeWhile(val => !!val)
  //       )
  //       .subscribe(val => console.log(val));
  //   });

  function pausableInterval(ms: number, pauser: Observable<boolean>) {
    let x = 0;
    const source = interval(ms);

    return pauser.pipe(
      switchMap(paused => (paused ? never() : source.pipe(map(() => x++))))
    );
  }

  //   it('pausableInterval', () => {
  //     const pauser = Observable.create((obs: Observer<boolean>) => {
  //       obs.next(false);
  //       setTimeout(() => {
  //         obs.next(true);
  //       }, 2000);

  //       setTimeout(() => {
  //         obs.next(false);
  //       }, 5000);

  //       setTimeout(() => {
  //         obs.next(true);
  //       }, 7000);
  //     });

  //     pausableInterval(1000, pauser).subscribe(val => console.log(val));
  //   });

  function pausableSpecifiableInterval(
    ms: number,
    pauser: Observable<boolean>,
    specifier: Observable<number>
  ) {
    let x = 0;
    const source = interval(ms);

    specifier.subscribe(val => (x = val));

    return pauser.pipe(
      switchMap(paused => (paused ? never() : source.pipe(map(() => x++))))
    );
  }

  it('pausableSpecifiableInterval', () => {
    const pauser = Observable.create((obs: Observer<boolean>) => {
      obs.next(false);
      setTimeout(() => {
        obs.next(true);
      }, 2000);

      setTimeout(() => {
        obs.next(false);
      }, 5000);

      setTimeout(() => {
        obs.next(true);
      }, 7000);
    });

    const specifier = Observable.create((obs: Observer<number>) => {
      setTimeout(() => {
        obs.next(100);
      }, 1500);
    });

    pausableSpecifiableInterval(1000, pauser, specifier).subscribe(val =>
      console.log(val)
    );
  });
});
