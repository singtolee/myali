import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../tools/Product';
export const API = "https://singtostore.com?prdurl=";

interface Prd {
  loaded: boolean;
  data:Product;
}

@Component({
  selector: 'app-url-api',
  templateUrl: './url-api.component.html',
  styleUrls: ['./url-api.component.css']
})
export class UrlApiComponent implements OnInit {

  showSpinner:boolean = false;
  url:string;
  prdData:any;


  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  callApi(){
    this.showSpinner = true;
    //this.url = event.clipboardData.getData(`text`);
    const address = API.concat(this.url);
    this.http.get<Prd>(address).subscribe((res)=>{
      this.showSpinner=false;
      if(res.loaded){
        this.prdData = this.reformDate(res.data);
        console.log(this.prdData);
        console.log(res);
      }else {
        //call again
        this.callApi()
      }
    });

  }

  reformDate(data){
    var mydate = new Product();
    mydate.images = data.images;
    mydate.pid = Number(data.pid);
    mydate.score = Number(data.score);
    mydate.time = new Date();
    mydate.keyword = 'api';
    mydate.status = false;
    mydate.url = this.url;
    mydate.uw = 1;
    mydate.thName = data.name;
    mydate.name = data.name;
    mydate.trade_info = [{min_num:'1',original_price:data.original_price,price:data.price}];
    mydate.original_price = this.handlePrice(data.price);
    mydate.price = this.handlePrice(data.price);
  
    if(data.skus[0].values){
      //mydate.sku = this.handleSku(data.skus[0],data.sku_detail)
    }else{
      mydate.sku = this.fakeSku(data)
    }
    return mydate

  }

  handlePrice(str){
    var num = str.split(/\-+/);
    if(num.length>1){
      return Number(num[1]);
    }
    if(num.length==1){
      return Number(num[0]);
    }
  }

  handleSku(skus,skudtail){
  }

  fakeSku(data){
    return {
      label:"สี",
      values:[{
          desc:"均码",
          thDesc:"หนึ่งขนาด",
          image:data.images[0],
          skus:[{
              sku:"均码",
              stock:999,
              sku_id:'1234567890',
              price:this.handlePrice(data.price),
              skuC:"均码",
              skuS:"均码",
              sugPrice:Math.ceil(this.handlePrice(data.price)*1.7),
              thSkuS:"หนึ่งขนาด"
          }]
      }],
      thLabel:"สี"

  }
  }

}
