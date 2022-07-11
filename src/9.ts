import { forkJoin, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { observer } from './helpers';

// creation functions: forkJoin
export function part9() {
  const randomName$ = ajax<{ first_name: string }>(
    'https://random-data-api.com/api/name/random_name'
  );

  const randomNation$ = ajax<{ capital: string }>(
    'https://random-data-api.com/api/nation/random_nation'
  );

  const randomFood$ = ajax<{ dish: string }>(
    'https://random-data-api.com/api/food/random_food'
  );

  forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
    ([
      {
        response: { first_name },
      },
      {
        response: { capital },
      },
      {
        response: { dish },
      },
    ]) => {
      console.log(`${first_name} is from ${capital} and likes to eat ${dish}`);
    }
  );

  const a$ = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.error(new Error('failure'));
    }, 2000);

    return () => {
      console.log('a teardown');
    };
  });

  const b$ = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next(0);
      subscriber.complete();
    }, 4000);

    return () => {
      console.log('b teardown');
    };
  });

  forkJoin([a$, b$]).subscribe(observer);
}
