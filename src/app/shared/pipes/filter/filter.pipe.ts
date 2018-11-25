import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any, field?: string, field1?: string, field2?: string): any {
    if (!value || value.length === 0) {
      return value;
    }
    return value.filter(item => {
      if (field && field1 && field2) {
       return item[field].toLowerCase().includes(args) ||
        item[field1].toLowerCase().includes(args) ||
        item[field2].toLowerCase().includes(args);
      }

      if (field && field1) {
        return item[field].toLowerCase().includes(args) ||
         item[field1].toLowerCase().includes(args);
      }

      if (field) {
        return item[field].toLowerCase().includes(args);
      }

      return value;
    });
  }

}
