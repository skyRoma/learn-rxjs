import { switchMap, map, Subscription } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../../helpers';

// switchMap
export function part15() {
  const unFlattenedObservable = frameworkTweetsObservable.pipe(
    map((framework) => getRecruitsObservable(framework))
  );

  const switchMapObservable = frameworkTweetsObservable.pipe(
    switchMap((framework) => getRecruitsObservable(framework))
  );

  let subscription: Subscription;

  unFlattenedObservable.subscribe({
    ...observer,
    next: (inner$) => {
      subscription?.unsubscribe();
      subscription = inner$.subscribe(observer);
    },
  });

  setTimeout(() => {
    console.log('switch map');
    switchMapObservable.subscribe(observer);
  }, 17000);
}
