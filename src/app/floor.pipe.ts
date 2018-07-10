import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ceil'
})
export class FloorPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return Math.ceil(value);
  }

}
