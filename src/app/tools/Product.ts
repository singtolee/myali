import { Dsku } from './Dsku';
import { Trade } from './Trade';

export class Product {

  pid: number;
  name: string;
  thName:string;
  price: any;
  original_price: number;
  trade_info: Array<Trade>;
  sku: Dsku;
  images: Array<string>;
  url: string;
  detail: Array<string>;
  keyword: string;
  score:number;
  uw:number;
  status:boolean;
  time:Date;
}