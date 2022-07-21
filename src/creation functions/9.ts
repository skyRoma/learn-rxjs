import { forkJoin, map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { observer } from '../helpers';

// creation functions: forkJoin
export function part9() {
  const randomName$ = ajax<{ first_name: string }>(
    'https://random-data-api.com/api/name/random_name'
  ).pipe(map((res) => res.response.first_name));

  const randomNation$ = ajax<{ capital: string }>(
    'https://random-data-api.com/api/nation/random_nation'
  ).pipe(map((res) => res.response.capital));

  const randomFood$ = ajax<{ dish: string }>(
    'https://random-data-api.com/api/food/random_food'
  ).pipe(map((res) => res.response.dish));

  forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
    ([firstName, capital, dish]) => {
      console.log(`${firstName} is from ${capital} and likes to eat ${dish}`);
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
