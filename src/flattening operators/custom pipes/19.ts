import { switchMap, Observable, Subscription } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../../helpers';

// switchMap
export function part19() {
  function mySwitchMap<T>(fn: (value: T) => Observable<T>) {
    return (source$: Observable<T>) =>
      new Observable<T>((subscriber) => {
        let sourceCompleted = false;
        let innerSubscriptionCounter = 0;

        let subscription: Subscription;
        let innerSubscription: Subscription;

        subscription = source$.subscribe({
          next: (value) => {
            if (innerSubscription) {
              innerSubscription?.unsubscribe();
              innerSubscriptionCounter--;
            }

            innerSubscriptionCounter++;

            innerSubscription = fn(value).subscribe({
              next: (value) => {
                subscriber.next(value);
              },
              error: (err) => subscriber.error(err),
              complete: () => {
                innerSubscriptionCounter--;

                if (sourceCompleted && !innerSubscriptionCounter) {
                  subscriber.complete();
                }
              },
            });
          },
          error: (err) => subscriber.error(err),
          complete: () => {
            sourceCompleted = true;
          },
        });

        return () => {
          subscription.unsubscribe();
          innerSubscription.unsubscribe();
        };
      });
  }

  const mySwitchMapObservable = frameworkTweetsObservable.pipe(
    mySwitchMap((framework) => getRecruitsObservable(framework))
  );

  const switchMapObservable = frameworkTweetsObservable.pipe(
    switchMap((framework) => getRecruitsObservable(framework))
  );

  mySwitchMapObservable.subscribe(observer);

  setTimeout(() => {
    console.log('switch map');
    switchMapObservable.subscribe(observer);
  }, 17000);
}
