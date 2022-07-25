import { catchError, concatMap, fromEvent, map, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { observer } from '../../helpers';

// concatMap
export function part21() {
  const fetchButton: HTMLButtonElement = document.querySelector('button#fetch');
  const endpointInput = document.querySelector<HTMLInputElement>('#endpoint');

  fromEvent<MouseEvent>(fetchButton, 'click')
    .pipe(
      map(() => endpointInput.value),
      concatMap((value) =>
        // food, name
        ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
          catchError((error) =>
            of({ response: `Couldn't fetch data ${error}` })
          )
        )
      ),
      map((res) => res?.response)
    )
    .subscribe(observer);
}
