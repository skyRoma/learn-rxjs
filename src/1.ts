import { Observable } from 'rxjs';
import { observer } from './helpers';

export function part1() {
  const observable$ = new Observable<number>((subscriber) => {
    console.log(1);
    subscriber.next(2);

    setTimeout(() => {
      subscriber.next(3);
    }, 1000);

    setTimeout(() => {
      subscriber.error(new Error('Failure'));
    }, 2000);

    setTimeout(() => {
      subscriber.next(4);
    }, 3000);

    return () => {
      console.log('teardown');
    };
  });

  console.log('before subscribe');
  const subscription = observable$.subscribe(observer);
  observable$.subscribe(observer);
  console.log('after subscribe');

  setTimeout(() => {
    console.log('unsubscribe');
    subscription.unsubscribe();
  }, 4000);
}
