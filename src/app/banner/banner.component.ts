import { Component, OnInit } from '@angular/core';
import { PassUrlService } from '../pass-url.service';
import { CmsService } from '../cms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor(private urlService:PassUrlService, 
              private router:Router,
              public cms:CmsService) {}

  ngOnInit() {
  }

  callApi(event:any){
    var url = event.clipboardData.getData(`text`);
    this.urlService.changeUrl(url);
    this.router.navigate(['/urlapi']);
  }
}
