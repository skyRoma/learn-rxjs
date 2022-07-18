import { exhaustMap, map } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from './helpers';

// exhaustMap
export function part16() {
  const unFlattenedObservable = frameworkTweetsObservable.pipe(
    map((framework) => getRecruitsObservable(framework))
  );

  const exhaustMapObservable = frameworkTweetsObservable.pipe(
    exhaustMap((framework) => getRecruitsObservable(framework))
  );

  let completed = true;

  unFlattenedObservable.subscribe({
    ...observer,
    next: (inner$) => {
      if (completed) {
        completed = false;

        inner$.subscribe({
          ...observer,
          complete: () => {
            completed = true;
          },
        });
      }
    },
  });

  setTimeout(() => {
    console.log('exhaust map');
    exhaustMapObservable.subscribe(observer);
  }, 17000);
}
