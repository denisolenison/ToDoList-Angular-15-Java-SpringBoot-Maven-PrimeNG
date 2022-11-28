import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class SortsService {

  sortTasksByTaskId(data: Task[]) {
    let key = '';
    key = 'taskId';


    let oldSort = data.slice(); //no reference
    data = data.sort((task1, task2) => (task1 as any)[key] >= (task2 as any)[key] ? 1 : -1);

  }


  reordertaskId(data: Task[]) {
    for (let i = 1 ; i < data.length ; ++i) {
      data[i-1]["taskId"] = i;
    }
    if (data[data.length-1]) data[data.length-1]["taskId"] = data.length;
    //я без понятия, почему последний элемент taskId не меняется
    return data;
  }


  eqTasks(task1: Task, task2 : Task) {
    let cond = true;
    if ((task1 as any)['taskStartDate'] != (task2 as any)['taskStartDate']) cond = false;
    if ((task1 as any)['taskEndDate'] != (task2 as any)['taskEndDate']) cond = false;
    if ((task1 as any)['taskName'] != (task2 as any)['taskName']) cond = false;
    if ((task1 as any)['taskCompleteDate'] != (task2 as any)['taskCompleteDate']) cond = false;
    if ((task1 as any)['taskIsComplete'] != (task2 as any)['taskIsComplete']) cond = false;
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
