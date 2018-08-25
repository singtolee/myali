import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export const API = "https://singtostore.com/search/?kw=";
export const ALI = "https://s.1688.com/selloffer/offer_search.htm?keywords=";

interface Gbk {
  toGBK: boolean;
  data: string;
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

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    if(this.resSub){
      this.resSub.unsubscribe()
    }
  }

  search(){
    const address = API.concat(this.keyword.trim());
    console.log(address);
    this.resSub =  this.http.get<Gbk>(address).subscribe(res=>{
      this.resp = res;
      if(this.resp.data){
        var searchUrl = ALI.concat(this.resp.data);
        this.keyword = ''
        console.log(searchUrl)
        window.open(searchUrl, "_blank");  //will be blocked by chrome
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

}
