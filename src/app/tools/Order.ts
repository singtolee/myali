import { Item } from './Item';
import { Time } from '@angular/common';
export class Order {
  createdTime:Time;
  pid: number;
  url: string;
  items:Array<Item>;
  uid:string;

}