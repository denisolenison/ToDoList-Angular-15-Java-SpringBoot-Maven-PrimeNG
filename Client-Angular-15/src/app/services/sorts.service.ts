import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class SortsService {

  sortTasks(data: Task[], typeOfSort : number) {
    let key = '';
    if (typeOfSort == 1) {
      key = 't_startDate';
    }
    else if (typeOfSort == 2) {
      key = 't_name';
    }
    else if (typeOfSort == 3) {
      key = 't_endDate';
    }
    else if (typeOfSort == 4) {
      key = 't_completeDate';
    }
    else if (typeOfSort == 5) {
      key = 't_progress';
    }
    else if (typeOfSort == 6) {
      key = 't_id';
    }


    let oldSort = data.slice(); //no reference
    if (typeOfSort != 5) {
      data = data.sort((task1, task2) => (task1 as any)[key] >= (task2 as any)[key] ? 1 : -1);
    }
    else {
      data = data.sort((task1, task2) => (task1 as any)[key] <= (task2 as any)[key] ? 1 : -1);
    }

    if (this.eqTArrs(oldSort, data) && typeOfSort != 6) {
      data = data.reverse();
    }
  }

  checkSorted(data: Task[], typeOfSort : number) {
    let key = '';
    if (typeOfSort == 1) {
      key = 't_startDate';
    }
    else if (typeOfSort == 2) {
      key = 't_name';
    }
    else if (typeOfSort == 3) {
      key = 't_endDate';
    }
    else if (typeOfSort == 4) {
      key = 't_completeDate';
    }
    else if (typeOfSort == 5) {
      key = 't_progress';
    }
    else if (typeOfSort == 6) {
      key = 't_id';
    }


    let oldSort = data.slice(); //no reference
    if (typeOfSort != 5) {
      data = data.sort((task1, task2) => (task1 as any)[key] >= (task2 as any)[key] ? 1 : -1);
    }
    else {
      data = data.sort((task1, task2) => (task1 as any)[key] <= (task2 as any)[key] ? 1 : -1);
    }

    if (this.eqTArrs(oldSort, data) || this.eqTArrs(oldSort.reverse(), data)) {
      return true;
    }
    else {
      return false;
    }
  }

  reorderT_ID(data: Task[]) {
    for (let i = 1 ; i < data.length ; ++i) {
      data[i-1]["t_id"] = i;
    }
    if (data[data.length-1]) data[data.length-1]["t_id"] = data.length;
    //я без понятия, почему последний элемент t_id не меняется
    return data;
  }

  checkOrderedByTID(data: Task[]) {
    let th = true;
    for (let i = 1 ; i < data.length - 1 ; ++i) {
      if (data[i]["t_id"] < data[i-1]["t_id"]) {
        th = false;
        return false;
      }
    }
    console.log(data);
    return th;
  }

  sortNReorder(data: Task[], type: number) {
    let dataNew = data.slice();
    this.sortTasks(dataNew, type);
    this.reorderT_ID(dataNew);
    return dataNew;
  }



  eqTasks(task1: Task, task2 : Task) {
    let cond = true;
    if ((task1 as any)['t_startDate'] != (task2 as any)['t_startDate']) cond = false;
    if ((task1 as any)['t_endDate'] != (task2 as any)['t_endDate']) cond = false;
    if ((task1 as any)['t_name'] != (task2 as any)['t_name']) cond = false;
    if ((task1 as any)['t_completeDate'] != (task2 as any)['t_completeDate']) cond = false;
    if ((task1 as any)['t_isComplete'] != (task2 as any)['t_isComplete']) cond = false;
    return cond;
  }

  eqTArrs(tArr1: Task[], tArr2: Task[]) {
    if (tArr1.length != tArr2.length) {
      return false;
    }
    else {
      for (let i = 0 ; i < tArr1.length ; ++i) {
        if (!this.eqTasks(tArr1[i], tArr2[i])) {
          return false;
        }
      }
    }
    return true;
  }


  constructor() { }
}
