import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
//import { Sku } from '../tools/Sku';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CalculatorComponent implements OnInit {

  @Input() public sku;

  constructor() { }

  ngOnInit() {
  }

  isObject(sth){
    return typeof sth === 'object';
  }

}
