import { catchError, EMPTY, Observable } from 'rxjs';
import { observer } from './helpers';

// catchError
export function part12() {
  const failureObservable$ = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.error(new Error('failure'));
    }, 3000);
  });

  console.log('App started');

  failureObservable$.pipe(catchError((_error) => EMPTY)).subscribe(observer);
}
