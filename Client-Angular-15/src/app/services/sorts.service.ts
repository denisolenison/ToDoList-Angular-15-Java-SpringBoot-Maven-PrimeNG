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


    let oldSort = data.slice(); //no reference
    if (typeOfSort != 5) {
      data = data.sort((task1, task2) => (task1 as any)[key] >= (task2 as any)[key] ? 1 : -1);
    }
    else {
      data = data.sort((task1, task2) => (task1 as any)[key] <= (task2 as any)[key] ? 1 : -1);
    }

    if (this.eqTArrs(oldSort, data)) {
      data = data.reverse();
    }
  }

  taskDown(data: Task[], index: number) {
    let t = data[index + 1];
    data[index + 1] = data[index];
    data[index] = t;
  }

  taskUp(data: Task[], index: number) {
    let t = data[index - 1];
    data[index - 1] = data[index];
    data[index] = t;
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
