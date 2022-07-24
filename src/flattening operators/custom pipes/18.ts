import { concatMap, Observable, Subscription } from 'rxjs';
import {
  ConcatQueueItem,
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../../helpers';

// concatMap
export function part18() {
  function myConcatMap<T>(fn: (value: T) => Observable<T>) {
    return (source$: Observable<T>) =>
      new Observable<T>((subscriber) => {
        const queue: ConcatQueueItem[] = [];
        let index = 0;

        let sourceCompleted = false;
        let innerSubscriptionCounter = 0;

        const subscription = new Subscription();

        subscription.add(
          source$.subscribe({
            next: (value) => {
              let i = index;
              index++;
              innerSubscriptionCounter++;

              queue.push({ obs$: fn(value), completed: false });

              if (i != 0 && !queue[i - 1]?.completed) {
                return;
              }

              checkNext(i);
            },
            error: (err) => subscriber.error(err),
            complete: () => {
              sourceCompleted = true;
            },
          })
        );

        function checkNext(i: number) {
          if (queue[i]) {
            subscription.add(
              queue[i].obs$.subscribe({
                next: (value) => {
                  subscriber.next(value);
                },
                error: (err) => subscriber.error(err),
                complete: () => {
                  innerSubscriptionCounter--;

                  if (sourceCompleted && !innerSubscriptionCounter) {
                    subscriber.complete();
                    return;
                  }

                  queue[i].completed = true;
                  checkNext(i + 1);
                },
              })
            );
          }
        }

        return () => {
          subscription.unsubscribe();
        };
      });
  }

  const myConcatMapObservable = frameworkTweetsObservable.pipe(
    myConcatMap((framework) => getRecruitsObservable(framework))
  );

  const concatMapObservable = frameworkTweetsObservable.pipe(
    concatMap((framework) => getRecruitsObservable(framework))
  );

  myConcatMapObservable.subscribe(observer);

  setTimeout(() => {
    console.log('concat map');
    concatMapObservable.subscribe(observer);
  }, 17000);
}
