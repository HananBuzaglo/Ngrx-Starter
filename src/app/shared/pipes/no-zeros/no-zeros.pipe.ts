import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noZeros'
})
export class NoZerosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // 1. remove simbol
    const simbol = value.substr(value.length - 2);
    // 2. check and remove decimal if needed
    const num = value.substr(0, value.length - 2);
    const decimal = num.substr(num.length - 2);
    if (decimal === '00') {
      value = num.substr(0, num.length - 3) + simbol;
    }
    // 3. add simbol return result
    return value;
  }

}
