import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myIsoDate'})
export class IsoDatePipe implements PipeTransform {
  public transform(value: string): string {
    return value.replace(/T/, ' ').replace(/\..*/, '');
  }
}
