import { combineLatest, fromEvent } from 'rxjs';

// creation functions: combineLatest
export function part10() {
  const temperatureInput = document.querySelector('#temperature');
  const conversionDropdown = document.querySelector('#conversion');
  const resultText = document.querySelector('#result-text');

  const temperature$ = fromEvent(temperatureInput, 'input');
  const conversion$ = fromEvent(conversionDropdown, 'input');

  combineLatest([temperature$, conversion$]).subscribe(
    ([temperatureEvent, conversionEvent]) => {
      const temperature = Number(
        (temperatureEvent.target as HTMLInputElement).value
      );
      const conversion = (conversionEvent.target as HTMLInputElement).value;

      let result: number;

      if (conversion === 'f-to-c') {
        result = ((temperature - 32) * 5) / 9;
      } else {
        result = (temperature * 9) / 5 + 32;
      }

      resultText.textContent = `Result: ${result}`;
    }
  );
}
