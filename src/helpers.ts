import { concatMap, delay, interval, map, Observer, of, take, tap } from 'rxjs';

export const observer: Observer<any> = {
  next: (value) => {
    console.log('next: ', value);
  },
  complete: () => {
    console.log('complete');
  },
  error: (error) => {
    console.log('error: ', error.message);
  },
};

export const frameworkTweetsObservable = of(
  'Backbone',
  'Angular',
  'React'
).pipe(
  concatMap((value) => of(value).pipe(delay(2000))),
  tap((framework) => console.log(`*** ${framework} tweet just popped up! ***`))
);

export const getRecruitsObservable = (framework: string) =>
  interval(1000).pipe(
    map((val) => `${framework} developer #${val + 1}`),
    take(4)
  );
