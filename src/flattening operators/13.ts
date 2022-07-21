import { mergeMap, map } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../helpers';

// mergeMap
export function part13() {
  const unFlattenedObservable = frameworkTweetsObservable.pipe(
    map((framework) => getRecruitsObservable(framework))
  );

  const mergeMapObservable = frameworkTweetsObservable.pipe(
    mergeMap((framework) => getRecruitsObservable(framework))
  );

  unFlattenedObservable.subscribe({
    ...observer,
    next: (inner$) => {
      inner$.subscribe(observer);
    },
  });

  setTimeout(() => {
    console.log('merge map');
    mergeMapObservable.subscribe(observer);
  }, 17000);
}
