# RxJS playground

1. Run `npm install`. This will install all needed dependencies.
2. Run `npm start`. This will run the dev server.
3. Open your browser and navigate to the provided URL (default: `http://localhost:8080/`).
4. Open the Console/DevTools in your browser to see the `console.log`s.
5. Keep modifying the `src/index.html` and `src/index.ts` files to adjust the code you want to run. **Saving these files will automatically reload the page.**
6. Enjoy!

- ```ts
  const observable$ = new Observable<number>((subscriber) => {
    subscriber.next(2);
    subscriber.error(new Error());
    subscriber.complete();
  });

  const observer: Observer<number> = {
    next: (value) => {
      console.log('next: ', value);
    },
    error: (error) => {
      console.log('error: ', error);
    },
    complete: () => {
      console.log('complete');
    },
  };

  const subscription = observable$.subscribe(observer);
  ```

  `subscriber` is a wrapper for `observer` with additional useful logic;

- `Cold` observable for each new subscription produced a new set of values inside this observable.
  `Hot` observables connect to the outside common shared source of values (e.g. Dom events).
  A cold observable starts producing data when some code invokes a `subscribe()` function on it.
  A hot observable produces data even if you are not subscribed;
- `pipe()` just creates a new Observable with some additional logic on top of the original
  observable;
- We can pass observer object inside `tap` operator to log `error` or `complete` notifications together with `next`;
- `catchError` handles errors, but skip all other events to the resulting observable.
  If the source observable terminates with an error, it will map that error to a new observable,
  subscribe to it, and forward all of its events to the resulting observable;
- `EMPTY` - a simple Observable that emits no items to the Observer and immediately emits a
  complete notification;
- Every `Subject` is an `Observable` and `Observer`.
