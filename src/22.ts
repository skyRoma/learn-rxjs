import { fromEvent, map, Subject } from 'rxjs';

// subject
export function part22() {
  const valueInput = document.querySelector<HTMLInputElement>('#value-input');
  const emitBtn = document.querySelector<HTMLInputElement>('#emit');
  const subscribeBtn = document.querySelector<HTMLInputElement>('#subscribe');

  const subject$ = new Subject();

  fromEvent(emitBtn, 'click')
    .pipe(map(() => valueInput.value))
    // used like observer!
    .subscribe(subject$);

  fromEvent(subscribeBtn, 'click').subscribe(() => {
    subject$.subscribe((value) => {
      console.log(value);
    });
  });
}
