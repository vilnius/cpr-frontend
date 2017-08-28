import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'isoDate'})
export class IsoDatePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/T/, ' ').replace(/\..*/, '');
  }
}
