import { Observable } from 'rxjs';

// hot observable
export function part4() {
  const helloButton: HTMLButtonElement = document.querySelector('button#hello');

  const helloClick$ = new Observable<MouseEvent>((subscriber) => {
    const handler = (event: MouseEvent) => {
      console.log('click');
      subscriber.next(event);
    };
    helloButton.addEventListener('click', handler);

    return () => {
      helloButton.removeEventListener('click', handler);
    };
  });

  const subscription1 = helloClick$.subscribe((event) => {
    console.log('Sub 1: ', event.type, event.x, event.y);
  });

  setTimeout(() => {
    subscription1.unsubscribe();
  }, 8000);

  setTimeout(() => {
    console.log('Sub 2 starts');
    helloClick$.subscribe((event) => {
      console.log('Sub 2: ', event.type, event.x, event.y);
    });
  }, 5000);
}
