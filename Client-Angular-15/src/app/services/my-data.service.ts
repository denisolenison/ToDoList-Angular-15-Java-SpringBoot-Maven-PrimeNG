import {Injectable, Output} from '@angular/core';
import { incTasks as dataInc , cTasks as dataC } from '../data/tasks';
import {incTask, cTask, Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  incTasks: Task[] = dataInc;
  cTasks: Task[] = dataC;

  @Output() tasks: Task[] = this.incTasks.concat(this.cTasks);

  constructor() { }

  getTask(task_id: number, isComplete: boolean) {
    if (!isComplete) {
      return this.incTasks[task_id - 1];
    }
    else {
      return this.cTasks[task_id - 1];
    }
  }

  addTask(task: Task, isComplete: boolean) {
    if (isComplete) {
      this.cTasks.push(task);
    }
    else {
      this.incTasks.push(task);
    }
    this.tasks = this.incTasks.concat(this.cTasks);
    return this.tasks;
  }

  deleteTask(taskId: number, isComplete: boolean) {
    if (isComplete) {
      this.cTasks.splice(taskId - 1, 1);
    }
    else {
      this.incTasks.splice(taskId - 1, 1);
    }
    this.tasks = this.incTasks.concat(this.cTasks);
    return this.tasks;
  }

  editTask(taskId: number, task: Task, isComplete: boolean) {
    if (isComplete) {
      this.cTasks[taskId - 1] = task;
    }
    else {
      this.incTasks[taskId - 1] = task;
    }
    this.tasks = this.incTasks.concat(this.cTasks);
    return this.tasks;
  }

  completeTask(task_id: number, cDate: Date) {
    this.incTasks[task_id-1].t_isComplete = true;
    this.incTasks[task_id-1].t_completeDate = cDate;
    let task = this.incTasks.splice(task_id-1, 1)[0];
    let nTask = new cTask(this.cTasks.length, task.t_name, task.t_startDate, task.t_endDate, true, task.t_completeDate);
    this.cTasks.push(nTask);
    this.tasks = this.incTasks.concat(this.cTasks);
    return this.tasks;
  }

  returnTask(task_id: number) {
    this.cTasks[task_id-1].t_isComplete = false;
    let task = this.cTasks.splice(task_id-1, 1)[0];
    let nTask = new incTask(this.incTasks.length, task.t_name, task.t_startDate, task.t_endDate, false);
    this.incTasks.push(nTask);
    this.tasks = this.incTasks.concat(this.cTasks);
    return this.tasks;
  }
}
