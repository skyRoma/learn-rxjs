import { fromEvent } from 'rxjs';
import { observer } from './helpers';

// creation functions: fromEvent
export function part7() {
  const helloButton: HTMLButtonElement = document.querySelector('button#hello');

  const subscription = fromEvent<MouseEvent>(helloButton, 'click').subscribe(
    observer
  );

  setTimeout(() => {
    console.log('unsubscribe');
    subscription.unsubscribe();
  }, 4000);
}
