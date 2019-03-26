import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) { 
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        //this.array = Object.assign({}, list); 못쓰는 이유는 key값??
      });
  }

  getDepartmentName($key){
    if($key == '0')
      return "";
    else{
      return _.find(this.array, (obj) => {
        return obj.$key == $key; })['name'];  // this.array.$key == $key from para then find name
    }
  }
}
