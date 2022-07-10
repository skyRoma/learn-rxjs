import { Observable } from 'rxjs';
import { observer } from './helpers';

export function part2() {
  const observable$ = new Observable<number>((subscriber) => {
    let counter = 0;

    const intervalId = setInterval(() => {
      console.log(`${counter} iteration`);
      subscriber.next(counter++);
    }, 1000);

    return () => {
      console.log('teardown');
      clearInterval(intervalId);
    };
  });

  const subscription = observable$.subscribe(observer);

  setTimeout(() => {
    subscription.unsubscribe();
  }, 5000);
}
