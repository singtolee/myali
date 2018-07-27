import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ScrollPositionRestoreService } from '../scroll-position-restore.service';

interface Category {
  title: string;
  imgUrl:string;
  keyWord:string;
  displayOrder:number;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Observable<Category[]>;
  private categoriesCol: AngularFirestoreCollection<Category>;
  dir = "CATEGORIES";

  constructor(private db: AngularFirestore, public router: Router, private spr:ScrollPositionRestoreService) {
    this.categoriesCol = db.collection<Category>(this.dir, ref =>{
      return ref.orderBy('displayOrder')
    });
    this.categories = this.categoriesCol.valueChanges();

  }

  ngOnInit() {
  }

  clearposition(){
    //this.spr.resetPosition()
  }

}
