import {Injectable, Output} from '@angular/core';
import { incTasks as dataInc , cTasks as dataC } from '../data/tasks';
import {incTask, cTask, Task} from "../models/task";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {enviroment} from "../../environments/enviroment";
import {Observable} from "rxjs";
import {SortsService} from "./sorts.service";

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private serverURL = enviroment.baseAPIURL;
  incTasks: Task[] = dataInc;
  cTasks: Task[] = dataC;

  @Output() tasks: Task[] = this.incTasks.concat(this.cTasks);

  constructor(private http: HttpClient, private sort: SortsService) { }

  getAllTasks(isComplete: boolean): Observable<Task[]> {
    if (!isComplete) {
      return this.http.get<Task[]>(`${this.serverURL}/it/all`);
    }
    else {
      return this.http.get<Task[]>(`${this.serverURL}/ct/all`);
    }
  }

  toIncTaskType(data: any): incTask {
    let id = 0, t_id = 0, t_name = "Name Error", t_startDate = "1970-01-01T00:00:00",
      t_endDate = "2037-12-31T23:59:59";
    if (data["_id"]) id = data["_id"];
    if (data["t_id"]) t_id = data["t_id"];
    if (data["t_name"]) t_name = data["t_name"];
    if (data["t_startDate"]) t_startDate = data["t_startDate"];
    if (data["t_endDate"]) t_endDate = data["t_endDate"];

    let newITask = new incTask(id, t_id, t_name, t_startDate, t_endDate, false);
    return newITask;
  }

  toCTaskType(data: any): cTask {
    let id = 0, t_id = 0, t_name = "Name Error", t_startDate = "1970-01-01T00:00:00",
      t_endDate = "2037-12-31T23:59:59", t_completeDate = "2006-06-06T06:06:06";
    if (data["_id"]) id = data["_id"];
    if (data["t_id"]) t_id = data["t_id"];
    if (data["t_name"]) t_name = data["t_name"];
    if (data["t_startDate"]) t_startDate = data["t_startDate"];
    if (data["t_endDate"]) t_endDate = data["t_endDate"];
    if (data["t_completeDate"]) t_completeDate = data["t_completeDate"];

    let newITask = new cTask(id, t_id, t_name, t_startDate, t_endDate, true, t_completeDate);
    return newITask;
  }


  addTask(task: Task, isComplete: boolean): Observable<Task> {
    if (isComplete) {
      return this.http.post<Task>(`${this.serverURL}/ct/add`, task);
      //this.cTasks.push(task);
    }
    else {
      return this.http.post<Task>(`${this.serverURL}/it/add`, task);
      //this.incTasks.push(task);
    }
    //this.tasks = this.incTasks.concat(this.cTasks);
    //return this.tasks;
  }

  deleteTask(taskId: number, isComplete: boolean): Observable<void> {
    if (!isComplete) {
      return this.http.delete<void>(`${this.serverURL}/it/delete/${taskId}`);
    }
    else {
      return this.http.delete<void>(`${this.serverURL}/ct/delete/${taskId}`);
    }
  }

  editTask(taskId: number, task: Task, isComplete: boolean): Observable<Task> {
    if (isComplete) {
      return this.http.put<Task>(`${this.serverURL}/ct/edit/${taskId}`, task);
    }
    else {
      return this.http.put<Task>(`${this.serverURL}/it/edit/${taskId}`, task);
    }
  }

  edit2Tasks(taskId1: number, taskId2: number, task1: Task, task2: Task, isComplete: boolean): Observable<Task[]> {
    if (isComplete) {
      let x2tasks : Task[] = [];
      x2tasks.push(task1);
      x2tasks.push(task2);
      return this.http.put<Task[]>(`${this.serverURL}/ct/edit2/${taskId1}/${taskId2}`, x2tasks);
    }
    else {
      let x2tasks : Task[] = [];
      x2tasks.push(task1);
      x2tasks.push(task2);
      return this.http.put<Task[]>(`${this.serverURL}/it/edit2/${taskId1}/${taskId2}`, x2tasks);
    }
  }

  fullSort(data: Task[], isComplete: boolean): Observable<Task[]> {
    if (isComplete) {
      return this.http.put<Task[]>(`${this.serverURL}/ct/editall/`, data);
    }
    else {
      return this.http.put<Task[]>(`${this.serverURL}/it/editall/`, data);
    }
  }



  completeTask(incTasks: Task[], task_id: number, cDate: string) {

    let deleteID = incTasks[task_id-1]["id"];
    let task = incTasks[task_id-1];

    let nTask = new cTask(this.cTasks.length, (this.cTasks.length > 0 ?  this.cTasks[this.cTasks.length - 1]["t_id"]+1 : 1),
    task.t_name, task.t_startDate, task.t_endDate, true, cDate);

    let res: any = [nTask, deleteID];
    return res;
  }

}
