import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sugPrice'
})
export class SugPricePipe implements PipeTransform {

  transform(value: number, args?: any): any {

    return Math.ceil(value*2/100)*100-1;
  }

}
