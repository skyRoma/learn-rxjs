import { debounceTime, fromEvent, map } from 'rxjs';

// debounceTime
export function part11() {
  const temperatureInput = document.querySelector('#temperature');

  fromEvent(temperatureInput, 'input')
    .pipe(
      debounceTime(2000),
      map((event) => (event.target as HTMLInputElement).value)
    )
    .subscribe((value) => {
      console.log(value);
    });
}
