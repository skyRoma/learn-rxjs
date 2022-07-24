import { concatMap, map, Observable } from 'rxjs';
import {
  frameworkTweetsObservable,
  getRecruitsObservable,
  observer,
} from '../../helpers';

// concatMap
export function part14() {
  const unFlattenedObservable = frameworkTweetsObservable.pipe(
    map((framework) => getRecruitsObservable(framework))
  );

  const concatMapObservable = frameworkTweetsObservable.pipe(
    concatMap((framework) => getRecruitsObservable(framework))
  );

  const queue: {
    obs$: Observable<any>;
    completed: boolean;
  }[] = [];

  let index = 0;

  unFlattenedObservable.subscribe({
    ...observer,
    next: (inner$) => {
      let i = index;
      index++;

      queue.push({ obs$: inner$, completed: false });

      if (i != 0 && !queue[i - 1]?.completed) {
        return;
      }

      checkNext(i);
    },
  });

  function checkNext(i: number) {
    if (queue[i]) {
      queue[i].obs$.subscribe({
        ...observer,
        complete: () => {
          queue[i].completed = true;
          checkNext(i + 1);
        },
      });
    }

    return;
  }

  setTimeout(() => {
    console.log('concat map');
    concatMapObservable.subscribe(observer);
  }, 17000);
}
