import { Item } from './Item';
export class Cart {
  time:Date;
  pid: number;
  name:string;
  items:Array<Item>;
  uid:string;
  price:number;
  total:number;
  qty:number;
  imageUrl:string;
  checked:boolean;
  earn:number;
  shippingCost:number;
  sugPrice:number;
  

}