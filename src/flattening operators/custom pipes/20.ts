import { exhaustMap, Observable, Subscription } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../../helpers';

// exhaustMap
export function part20() {
  function myExhaustMap<T>(fn: (value: T) => Observable<T>) {
    return (source$: Observable<T>) =>
      new Observable<T>((subscriber) => {
        let sourceCompleted = false;
        let innerCompleted = true;

        const subscription = new Subscription();

        subscription.add(
          source$.subscribe({
            next: (value) => {
              if (innerCompleted) {
                innerCompleted = false;

                subscription.add(
                  fn(value).subscribe({
                    next: (value) => {
                      subscriber.next(value);
                    },
                    error: (err) => subscriber.error(err),
                    complete: () => {
                      innerCompleted = true;

                      if (sourceCompleted && innerCompleted) {
                        subscriber.complete();
                      }
                    },
                  })
                );
              }
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

  const myExhaustMapMapObservable = frameworkTweetsObservable.pipe(
    myExhaustMap((framework) => getRecruitsObservable(framework))
  );

  const exhaustMapObservable = frameworkTweetsObservable.pipe(
    exhaustMap((framework) => getRecruitsObservable(framework))
  );

  myExhaustMapMapObservable.subscribe(observer);

  setTimeout(() => {
    console.log('exhaust map');
    exhaustMapObservable.subscribe(observer);
  }, 17000);
}
