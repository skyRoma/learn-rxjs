import { Observable, timer } from 'rxjs';
import { observer } from '../helpers';

// creation functions: timer
export function part8() {
  timer(2000).subscribe(observer);

  const customTimer = (ms: number) =>
    new Observable((subscriber) => {
      const timeoutId = setTimeout(() => {
        subscriber.next(0);
        subscriber.complete();
        console.log('time passed');
      }, ms);

      // comment it to check that timer still goes
      return () => {
        clearTimeout(timeoutId);
      };
    });

  customTimer(2000).subscribe(observer);

  const subscription = customTimer(2000).subscribe(observer);
  setTimeout(() => {
    console.log('unsubscribe');
    subscription.unsubscribe();
  }, 1000);
}
