import { debounceTime, fromEvent, map } from 'rxjs';

// debounceTime
export function part11() {
  const temperatureInput =
    document.querySelector<HTMLInputElement>('#temperature');

  fromEvent(temperatureInput, 'input')
    .pipe(
      debounceTime(2000),
      map(() => temperatureInput.value)
    )
    .subscribe((value) => {
      console.log(value);
    });
}
