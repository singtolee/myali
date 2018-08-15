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
  @Input() public val;
  @Input() public co;
  qty = 0;

  constructor(private psku:PassSkuService) { }

  ngOnInit() {
  }

  delSkus(obj){
    if(obj.image){
      return {desc:obj.desc,thDesc:obj.thDesc,image:obj.image}
    }else {
      return {desc:obj.desc,thDesc:obj.thDesc}
    }
    
  }

  inc(){
    this.qty = this.qty + 1
    const newItem = {sku:this.delSkus(this.val), size:this.co, qty:this.qty, id:this.co.sku_id}
    const i = this.psku.itemSource.findIndex(ele=>ele.id==newItem.id)
    if(i==-1){
      this.psku.addItem(newItem)
    }else{
      this.psku.itemSource[i].qty=newItem.qty
    }
  }

  des(){
    this.qty = this.qty -1
    if(this.qty == 0){
      const newItem = {sku:this.delSkus(this.val), size:this.co, qty:this.qty, id:this.co.sku_id}
      const i = this.psku.itemSource.findIndex(ele=>ele.id==newItem.id)
      this.psku.itemSource.splice(i,1)
      return
    }

    if(this.qty<0){
      this.qty=0
      return
    }

    if(this.qty>0){
      //const ni = {sku:this.color,size:this.size,qty:this.qty}
      const newItem = {sku:this.delSkus(this.val), size:this.co, qty:this.qty, id:this.co.sku_id}
      const i = this.psku.itemSource.findIndex(ele=>ele.id==newItem.id)
      if(i==-1){
        this.psku.addItem(newItem)
      }else{
        this.psku.itemSource[i].qty=newItem.qty
      }
      return
    }
  }

}
