import { Component, OnInit, Input } from '@angular/core';
import { PassSkuService } from '../pass-sku.service';

@Component({
  selector: 'app-qtypicker',
  templateUrl: './qtypicker.component.html',
  styleUrls: ['./qtypicker.component.css']
})
export class QtypickerComponent implements OnInit {

  //@Input() public size;
  //@Input() public color;
  @Input() public sku;
  qty = 0;

  constructor(private psku:PassSkuService) { }

  ngOnInit() {
  }

  /*

  inc(){
    this.qty = this.qty + 1
    const ni = {sku:this.color,size:this.size,qty:this.qty}
    const i = this.psku.itemSource.findIndex(ele=>ele.sku==ni.sku&&ele.size==ni.size)
    if(i==-1){
      this.psku.addItem(ni)
    }else{
      this.psku.itemSource[i]=ni
    }
  }

  des(){
    this.qty = this.qty -1
    if(this.qty == 0){
      const ni = {sku:this.color,size:this.size,qty:this.qty}
      const i = this.psku.itemSource.findIndex(ele=>ele.sku==ni.sku&&ele.size==ni.size)
      this.psku.itemSource.splice(i,1)
      return
    }

    if(this.qty<0){
      this.qty=0
      return
    }

    if(this.qty>0){
      const ni = {sku:this.color,size:this.size,qty:this.qty}
      const i = this.psku.itemSource.findIndex(ele=>ele.sku==ni.sku&&ele.size==ni.size)
      if(i==-1){
        this.psku.addItem(ni)
      }else{
        this.psku.itemSource[i]=ni
      }
      return
    }
  }

  */

}
