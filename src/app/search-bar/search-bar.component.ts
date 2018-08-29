import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlSelectorComponent } from '../url-selector/url-selector.component';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const API = "https://singtostore.com/search/?kw=";

const ALI = "https://s.1688.com/selloffer/offer_search.htm?keywords=";
const MALI ="https://m.1688.com/offer_search/-6D7033.html?fromMode=supportBack&keywords="

const JDF = "https://search.jd.com/Search?keyword="
const JDL = "&enc=utf-8"

const MJDF = "http://so.m.jd.com/ware/search.action?keyword="
const MJDL = "&searchFrom=home"

interface Gbk {
  toGBK: boolean;
  gbk: string;
  cnkw:string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  keyword:string;
  resp:Gbk;
  resSub:Subscription;
  isSearching:boolean = false;
  //ALI and JD desktop & mobile Urls
  aliurl:string;
  maliurl:string;
  jdurl:string;
  mjdurl:string;
  constructor(private http: HttpClient,
              private whatDevice:DeviceDetectorService,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.resSub){
      this.resSub.unsubscribe()
    }
  }

  search(){
    this.isSearching = true
    const address = API.concat(this.keyword.trim());
    this.resSub =  this.http.get<Gbk>(address).subscribe(res=>{
      this.resp = res;
      if(this.resp.gbk){ //success
        this.makeUrls()
        if(this.whatDevice.isDesktop()){
          const modalRef = this.modalService.open(UrlSelectorComponent, { centered: true });
          modalRef.componentInstance.info = {isDesktop:true,
                                            keyword:this.keyword,
                                            aliUrl:this.aliurl,
                                            jdUrl:this.jdurl};
        }else{
          const modalRef = this.modalService.open(UrlSelectorComponent, { centered: true });
          modalRef.componentInstance.info = {isDesktop:false,
                                              keyword:this.keyword,
                                              aliUrl:this.maliurl,
                                              jdUrl:this.mjdurl};
        }
        this.keyword = '';
      }else {
        const modalRef = this.modalService.open(ErrorMsgComponent, { centered: true });
        modalRef.componentInstance.msg = "ข้อผิดพลาดทางอินเทอร์เน็ต" //internet error
        //Modal error to re try
        console.log("ERROR")
      }
    })
  }

  isEmpty(){
    if(this.keyword){
      var kk = this.keyword.trim()
      if(kk.length>0){
        return false
      }else {
        return true
      }
    }else {
      return true
    }
  }

  makeUrls(){
    this.aliurl = ALI.concat(this.resp.gbk);
    this.maliurl = MALI.concat(this.resp.cnkw);
    this.jdurl = JDF.concat(this.resp.cnkw).concat(JDL);
    this.mjdurl = MJDF.concat(this.resp.cnkw).concat(MJDL);
    //reset state and clean keyword
    this.isSearching = false

  }

}
