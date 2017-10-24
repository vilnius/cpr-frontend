import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'myDuration'})
export class DurationPipe implements PipeTransform {
  public transform(value: string): string {
    const seconds = parseInt(value, 10);
    if (isNaN(seconds)) {
      return '-';
    }
    const hours = Math.floor(seconds / 3600) % 24;
    const minutes = Math.floor(seconds / 60) % 60;
    const sec = seconds % 60;
    return [hours, minutes, sec]
      .map((v) => v < 10 ? '0' + v : v)
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  }
}
