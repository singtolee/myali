import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { PassSkuService } from '../pass-sku.service';
import { take, map, tap, reduce } from 'rxjs/operators'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit {

  @Input() public sku;
  @Input() public pid;
  uid;
  items;
  total=0;

  constructor(private auth:AuthService,private psku:PassSkuService) { }

  ngOnInit() {
    this.psku.itemSource.length = 0;
    this.psku.items.subscribe(i=>this.items=i)
  }

  isObject(sth){
    return typeof sth === 'object';
  }

}
