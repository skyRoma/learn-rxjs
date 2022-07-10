import { ajax } from 'rxjs/ajax';

// cold observable
export function part3() {
  const ajax$ = ajax<{ first_name: string }>(
    'https://random-data-api.com/api/name/random_name'
  );

  ajax$.subscribe((data) => {
    console.log(data.response.first_name);
  });

  ajax$.subscribe((data) => {
    console.log(data.response.first_name);
  });

  ajax$.subscribe((data) => {
    console.log(data.response.first_name);
  });
}
