import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cny2thb'
})
export class Cny2thbPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(typeof value === 'string'){
      var nums = value.split(/\-+/);
      if(nums.length==1){
        return Math.ceil(Number(nums[0])*6) + ' บาท';
      }else {
        return Math.ceil(Number(nums[0])*6) + '~' + Math.ceil(Number(nums[1])*6) + ' บาท';
      }
    }
    return Math.ceil(value*6) + ' บาท';
  }

}
