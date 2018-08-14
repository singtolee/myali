import { Pipe, PipeTransform } from '@angular/core';
import { CmsService } from './cms.service';

@Pipe({
  name: 'cny2thb'
})
export class Cny2thbPipe implements PipeTransform {

  constructor(private cm:CmsService){}

  transform(value: any, args?: any): any {
    if(typeof value === 'string'){
      var nums = value.split(/\-+/);
      if(nums.length==1){
        return Math.ceil(Number(nums[0])*this.cm.costSheet.rate) + ' บาท';
      }else {
        return Math.ceil(Number(nums[0])*this.cm.costSheet.rate) + '~' + Math.ceil(Number(nums[1])*6) + ' บาท';
      }
    }
    return Math.ceil(value*this.cm.costSheet.rate) + ' บาท';
  }

}
