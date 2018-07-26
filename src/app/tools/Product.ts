import { Sku } from './Sku';
import { Trade } from './Trade';
import { SkuDetail } from './SkuDetail';
export class Product {

  pid: number;
  name: string;
  thName:string;
  price: string;
  original_price: number;
  trade_info: Array<Trade>;
  sales_count: number;
  sku: Array<Sku>;
  images: Array<string>;
  url: string;
  detail: Array<string>;
  keyword: string;
  score:number;
  comment_count:number;
  uw:number;
  status:boolean;
}