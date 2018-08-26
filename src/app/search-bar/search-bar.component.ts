import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export const API = "https://singtostore.com/search/?kw=";
export const ALI = "https://s.1688.com/selloffer/offer_search.htm?keywords=";
export const MALI ="https://m.1688.com/offer_search/-6D7033.html?fromMode=supportBack&keywords="

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
  searchUrl:string;
  mUrl:string;

  constructor(private http: HttpClient) { }

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
      console.log(this.resp)
      if(this.resp.gbk){
        this.searchUrl = ALI.concat(this.resp.gbk);
        console.log(this.searchUrl)
        this.mUrl = MALI.concat(this.resp.cnkw);
        console.log(this.mUrl)
        this.keyword = ''
        let el: HTMLElement = document.getElementById('myclick') as HTMLElement;
        el.setAttribute('href',this.mUrl)//detect is mobile or tablet or desktop, then set the url accordingly
        el.click()
        console.log(el)
        this.isSearching = false
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

  logsth(){
    //window.open(this.searchUrl, "_blank");
    //window.open(this.mUrl,"_blank");

  }

}
