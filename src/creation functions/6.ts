import { from } from 'rxjs';
import { observer } from '../helpers';

// creation functions: from
export function part6() {
  from([1, 2, 3]).subscribe(observer);

  const promise = new Promise((res) => {
    setTimeout(() => {
      res('resolved');
    }, 1500);
  });

  const promise2 = new Promise((_res, rej) => {
    setTimeout(() => {
      rej(new Error('failure'));
    }, 1500);
  });

  from(promise).subscribe(observer);
  from(promise2).subscribe(observer);
}
