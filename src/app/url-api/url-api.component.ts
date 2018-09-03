import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../tools/Product';
import { Dsku } from '../tools/Dsku';
import { MySkuDetail } from '../tools/MySkuDetail';
import { Details } from '../tools/Details';
import { AngularFirestore } from 'angularfire2/firestore';
import { PassUrlService } from '../pass-url.service';
import { AuthService } from '../auth.service';
import { PassPrdObjectService } from '../pass-prd-object.service';
import { ApiUrlsHistoryService } from '../api-urls-history.service';
import { Subscription } from 'rxjs';
const APIP = "https://singtostore.com?prdurl=";
const APIF = "https://us-central1-alitoyou-168.cloudfunctions.net/apicall?text=";
const ALIURL = "https://detail.1688.com/offer/";
const JDURL = "https://item.jd.com/";
const MALI = "m.1688.com";
const MJD = "item.m.jd.com";

interface Prd {
  loaded: boolean;
  error_code:number;
  data: Product;
}

@Component({
  selector: 'app-url-api',
  templateUrl: './url-api.component.html',
  styleUrls: ['./url-api.component.css']
})
export class UrlApiComponent implements OnInit, OnDestroy {

  private user;
  userSub:Subscription;

  isJDUrl: boolean;

  showSpinner: boolean = false;
  url: string;
  prdData: Product;
  apiError: boolean = false;
  urlSub: Subscription;
  dir = "PRODUCTS";
  localPrds: Array<Product>;
  localPrdSub: Subscription;

  timePassed:number = 0;
  timerID:any;

  constructor(private db: AngularFirestore,
    private http: HttpClient,
    private auth: AuthService,
    private urlService: PassUrlService,
    private passprd:PassPrdObjectService,
    private auhs: ApiUrlsHistoryService) { }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(u=>this.user=u)
    this.localPrdSub = this.auhs.prds.subscribe(p => this.localPrds = p);
    this.urlSub = this.urlService.currentUrl.subscribe(u => {
      this.url = u;
      if (this.url) {
        this.callApi();
      }
    })

  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.urlSub.unsubscribe();
    this.localPrdSub.unsubscribe();
  }

  startTimeCount(){
    this.timerID = setInterval(()=>{this.timePassed+=1},1000)
  }
  stopTimeCount(){
    clearInterval(this.timerID);
    this.timePassed = 0
  }

  mobile2desktop(murl: string) {
    if (murl.includes(MALI) || murl.includes(MJD)) {
      console.log("Mobile Url Detected")
      if (murl.includes(MALI)) {
        console.log("1688 Mobile Url")
        var pidhtml = murl.match(/\d+.html/)
        console.log(pidhtml)
        return ALIURL.concat(pidhtml[0])
      }
      if (murl.includes(MJD)) {
        console.log("JD Mobile Url")
        var pidhtml = murl.match(/\d+/)
        console.log(pidhtml)
        return JDURL.concat(pidhtml[0]).concat(".html")
      }
    } else {
      console.log("Desktop Url Detected")
      return murl;
    }
  }

  isJD(url: string) {
    if (url.includes("jd.com")) {
      return true
    } else {
      return false
    }
  }

  callApi() {
    // is JD or ALIBABA
    this.startTimeCount()
    this.isJDUrl = this.isJD(this.url)
    this.showSpinner = true;
    this.apiError = false;
    const address = APIF.concat(this.mobile2desktop(this.url));
    this.http.get<Prd>(address).subscribe((res) => {
      this.showSpinner = false;
      if (res.loaded&&res.error_code==0) {
        console.log(res);
        this.prdData = this.reformDate(res.data);
        this.urlService.changePrd(this.prdData);
        this.stopTimeCount();
        this.auhs.addItem(this.prdData)
        this.urlService.changeUrl('');
        if(this.user){
          //console.log("USER LOGGEDIN")
          this.save2firestore();
        }else {
          //console.log("NOT LOG IN YET")
        }
        console.log(this.prdData);
      } else {
        this.stopTimeCount();
        console.log(res)
        this.apiError = true
        this.url = ''
      }
    });

  }


  save2firestore() {
    this.db.collection(this.dir).add(JSON.parse(JSON.stringify(this.prdData)))
  }

  reformDate(data) {
    var mydate = new Product();
    mydate.images = data.images.map(item => item.image_url);
    mydate.pid = Number(data.pid);
    mydate.score = Number(data.score) > 5 ? 5 : Number(data.score);  //Jing Dong use 100 grade, 1688 use 5 grade
    mydate.time = new Date();
    mydate.keyword = 'api';
    mydate.status = false;
    mydate.url = this.mobile2desktop(this.url);
    mydate.uw = 1;
    mydate.thName = data.thName;
    mydate.name = data.name;
    mydate.trade_info = [{ min_num: '1', original_price: data.original_price, price: data.price }];
    mydate.original_price = this.handlePrice(data.price);
    mydate.price = this.handlePrice(data.price);

    if (data.skus.length == 0 || !data.skus[0].values) {  // JD skus.length =0, ALI skus.length = 1 ['暂无']
      mydate.sku = this.fakeSku(data)
    } else {

      if(data.skus[0].label != "尺码") {
        mydate.sku = this.handleSku(data.skus[0], data.sku_detail, mydate.price)
      }else {
        mydate.sku = this.copySku(data)
      }
    }

    this.url = '';
    return mydate

  }

  handlePrice(str) {
    var num = str.split(/\-+/);
    if (num.length > 1) {
      return Number(num[1]);
    }
    if (num.length == 1) {
      return Number(num[0]);
    }
  }

  handleSku(skus, skudtail, priceStr) {
    var dsku = new Dsku();
    var myskuArray = new Array<MySkuDetail>();
    dsku.label = "颜色";
    dsku.thLabel = "สสีที่มีให้";
    for (const val of skus.values) {
      var detailsArray = new Array<Details>();
      var mysku = new MySkuDetail();
      mysku.desc = val.desc;
      if (val.image) {
        mysku.image = val.image
      }
      mysku.thDesc = val.thDesc;
      for (const sd of skudtail) {
        if (sd.sku_name.includes(val.desc)) {
          var details = new Details();
          details.sku = sd.sku_name;
          if (this.isJDUrl) {
            console.log("DEALING WITH JD URL")
            var bb = sd.sku_name.split(/\s/);
            if (bb.length > 1) {
              details.skuS = bb[0];
              details.skuC = bb[1];
              //details.thSkuS = sd.sku_thName;
              details.thSkuS = bb[0];
            } else {
              details.skuC = bb[0];
              details.skuS = bb[0];
              details.thSkuS = sd.sku_thName;
            }

          } else {
            console.log("DEALING WITH 1688 URL")
            var bb = sd.sku_name.split(/\>/);
            if (bb.length > 1) {
              details.skuC = bb[0];
              details.skuS = bb[1];
              //details.thSkuS = sd.sku_thName;
              details.thSkuS = bb[1];
            } else {
              details.skuC = bb[0];
              details.skuS = bb[0];
              details.thSkuS = sd.sku_thName;
            }
          }
          details.sku_id = sd.sku_id;
          details.stock = Number(sd.sku_stock) ? Number(sd.sku_stock) : 999;
          details.price = this.handlePrice(sd.sku_price) ? this.handlePrice(sd.sku_price) : priceStr;
          details.sugPrice = Math.ceil(details.price * 1.7);
          detailsArray.push(details);
        }
      }
      mysku.skus = detailsArray;
      myskuArray.push(mysku);
    }
    dsku.values = myskuArray;

    for (const cp of dsku.values) {
      cp.skus.sort(this.compare)
    }
    return dsku;
  }

  compare(a, b) {
    if (a.sku_id > b.sku_id) {
      return 1;
    }
    if (a.sku_id < b.sku_id) {
      return -1;
    }
    return 0;
  }

  copySku(data) {
    var fakeImg = "https://firebasestorage.googleapis.com/v0/b/alitoyou-168.appspot.com/o/BANNER%2Fnoimg.png?alt=media&token=659ead91-75d6-4c36-8501-ec5e2d5c0ce0";
    if(data.images.length>0){
      fakeImg = data.images[0].image_url
    }
    var onlysize = data.sku_detail.map(item =>{return {
      sku: item.sku_name,
      stock: 9999,
      sku_id: item.sku_id,
      price: this.handlePrice(item.sku_price),
      skuC: item.sku_name,
      skuS: item.sku_name,
      sugPrice: Math.ceil(this.handlePrice(item.sku_price) * 1.7),
      thSkuS: item.sku_thName
    }})
    return {
      label: "สี",
      values: [{
        desc: "可选尺码",
        thDesc: "ขนาดที่มีจำหน่าย",
        image: fakeImg,  //in case data.images.length is 0, for JD.com use placeholder to replace
        skus: onlysize
      }],
      thLabel: "สี"
    }

  }

  fakeSku(data) {
    var fakeImg = "https://firebasestorage.googleapis.com/v0/b/alitoyou-168.appspot.com/o/BANNER%2Fnoimg.png?alt=media&token=659ead91-75d6-4c36-8501-ec5e2d5c0ce0";
    if(data.images.length>0){
      fakeImg = data.images[0].image_url
    }
    return {
      label: "สี",
      values: [{
        desc: "均码",
        thDesc: "หนึ่งขนาด",
        image: fakeImg,  //in case data.images.length is 0, for JD.com use placeholder to replace
        skus: [{
          sku: "均码",
          stock: 999,
          sku_id: '1234567890',
          price: this.handlePrice(data.price),
          skuC: "均码",
          skuS: "均码",
          sugPrice: Math.ceil(this.handlePrice(data.price) * 1.7),
          thSkuS: "หนึ่งขนาด"
        }]
      }],
      thLabel: "สี"

    }
  }

  gotodetail(prd:Product){
    this.passprd.changeProduct(prd);

  }

}
