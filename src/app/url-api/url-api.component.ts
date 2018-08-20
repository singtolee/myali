import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../tools/Product';
import { Dsku } from '../tools/Dsku';
import { MySkuDetail } from '../tools/MySkuDetail';
import { Details } from '../tools/Details';
import { AngularFirestore } from 'angularfire2/firestore';
import { PassUrlService } from '../pass-url.service';
import { Subscription } from 'rxjs';
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
export class UrlApiComponent implements OnInit, OnDestroy {

  showSpinner:boolean = false;
  url:string;
  prdData:Product;
  retryCounter:number = 0;
  apiError:boolean = false;
  urlSub:Subscription;
  dir = "PRODUCTS"

  constructor(private db:AngularFirestore, 
              private http:HttpClient, 
              private urlService:PassUrlService) { }

  ngOnInit() {
    this.urlSub = this.urlService.currentUrl.subscribe(u=>{
      this.url = u;
      if(this.url){
        this.callApi();
      }
    })
  }
  ngOnDestroy(){
    this.urlSub.unsubscribe();
  }

  callApi(){
    this.showSpinner = true;
    this.apiError = false;
    const address = API.concat(this.url);
    this.http.get<Prd>(address).subscribe((res)=>{
      this.showSpinner=false;
      if(res.loaded){
        this.prdData = this.reformDate(res.data);
        this.urlService.changePid(this.prdData.pid);
        this.save2firestore();
        console.log(this.prdData);
        console.log(res);
      }else {
        console.log(res)
        console.log("re try: " + this.retryCounter);
        //if failed call again , call 3 times then dispaly error mes???
        if(this.retryCounter>2){
          this.apiError = true;
          this.retryCounter = 0;
          return
        }else{
          this.retryCounter +=1;
          this.callApi();
        }
      }
    });

  }


  save2firestore(){

    this.db.collection(this.dir).add(JSON.parse( JSON.stringify(this.prdData)))
  }

  reformDate(data){
    var mydate = new Product();
    mydate.images = data.images.map(item=>item.image_url);
    mydate.pid = Number(data.pid);
    mydate.score = Number(data.score)>5? 5:Number(data.score);  //Jing Dong use 100 grade, 1688 use 5 grade
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
      mydate.sku = this.handleSku(data.skus[0],data.sku_detail,mydate.price)
    }else{
      mydate.sku = this.fakeSku(data)
    }
    this.url = '';
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

  handleSku(skus,skudtail,priceStr){
    var dsku = new Dsku();
    var myskuArray = new Array<MySkuDetail>();
    dsku.label = "颜色";
    dsku.thLabel = "สี";
    for(const val of skus.values){
      var detailsArray = new Array<Details>();
      var mysku = new MySkuDetail();
      mysku.desc = val.desc;
      if(val.image){
        mysku.image = val.image
      }
      mysku.thDesc = val.desc;
      for(const sd of skudtail){
        if(sd.sku_name.includes(val.desc)){
          var details = new Details();
          details.sku = sd.sku_name;
          var bb = sd.sku_name.split(/\>/);
          if(bb.length>1){
            details.skuC = bb[0];
            details.skuS = bb[1];
            details.thSkuS = bb[1];
          }else{
            details.skuC = bb[0];
            details.skuS = bb[0];
            details.thSkuS = bb[0];
          }
          details.sku_id = sd.sku_id;
          details.stock = Number(sd.sku_stock)? Number(sd.sku_stock):999;
          console.log(typeof(sd.sku_price));
          details.price = this.handlePrice(sd.sku_price)? this.handlePrice(sd.sku_price):priceStr;
          details.sugPrice = Math.ceil(details.price*1.7);
          detailsArray.push(details);
        }
      }
      mysku.skus = detailsArray;
      myskuArray.push(mysku);
    }
    dsku.values = myskuArray;

    for(const cp of dsku.values){
      cp.skus.sort(this.compare)
    }
    return dsku;
  }

  compare(a,b){
    if(a.sku_id>b.sku_id){
        return 1;
    }
    if(a.sku_id<b.sku_id){
        return -1;
    }
    return 0;
}

  fakeSku(data){
    return {
      label:"สี",
      values:[{
          desc:"均码",
          thDesc:"หนึ่งขนาด",
          image:data.images[0].image_url,
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
