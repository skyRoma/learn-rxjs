import { mergeMap, Observable, Subscription } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../../helpers';

// mergeMap
export function part17() {
  function myMergeMap<T>(fn: (value: T) => Observable<T>) {
    return (source$: Observable<T>) =>
      new Observable<T>((subscriber) => {
        let sourceCompleted = false;
        let innerSubscriptionCounter = 0;

        const subscription = new Subscription();

        subscription.add(
          source$.subscribe({
            next: (value) => {
              innerSubscriptionCounter++;

              subscription.add(
                fn(value).subscribe({
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
                })
              );
            },
            error: (err) => subscriber.error(err),
            complete: () => {
              sourceCompleted = true;
            },
          })
        );

        return () => {
          subscription.unsubscribe();
        };
      });
  }

  const myMergeMapObservable = frameworkTweetsObservable.pipe(
    myMergeMap((framework) => getRecruitsObservable(framework))
  );

  const mergeMapObservable = frameworkTweetsObservable.pipe(
    mergeMap((framework) => getRecruitsObservable(framework))
  );

  myMergeMapObservable.subscribe(observer);

  setTimeout(() => {
    console.log('merge map');
    mergeMapObservable.subscribe(observer);
  }, 17000);
}
