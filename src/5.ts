import { Observable, of } from 'rxjs';
import { observer } from './helpers';

// creation functions: of
export function part5() {
  of(1, 2, 3).subscribe(observer);

  const customOf = (...values: number[]) =>
    new Observable<number>((subscriber) => {
      values.forEach((value) => {
        subscriber.next(value);
      });
      subscriber.complete();
    });

  customOf(4, 5, 6).subscribe(observer);
}
