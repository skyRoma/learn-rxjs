import { Observer } from 'rxjs';

export const observer: Observer<any> = {
  next: (value) => {
    console.log('next: ', value);
  },
  complete: () => {
    console.log('complete');
  },
  error: (error) => {
    console.log('error: ', error.message);
  },
};
