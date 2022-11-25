import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Task } from './models/task';
import { incTasks as dataInc , cTasks as dataC } from './data/tasks';
import { SortsService } from "./services/sorts.service";
import {MyDataService} from "./services/my-data.service";
import {TableRowComponent} from "./components/table-row/table-row.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  incTasks: Task[] = dataInc;
  cTasks: Task[] = dataC;

  tasks: Task[] = this.incTasks.concat(this.cTasks);
  task_id: number;

  constructor(private primengConfig: PrimeNGConfig, private ss: SortsService, private t: MyDataService) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    setInterval(() => {this.mainApp();}, 50);
  }

  public currentPage : number = 1;

  public windowVisible : boolean = false;
  public windowType : string = "add";


  public headerHeight : string = "0px";
  public header2Height : string = "0px";

  public WHHeight : string = "0 px";

  GetPageFromChild(page:number) {
    this.currentPage = page;
  }

  GetDataFromChild(tasks:Task[]) {
    this.tasks = tasks;
  }

  setWindow(obj:any) {
    this.windowVisible = obj.open;
    this.windowType = obj.type;
    if (obj.task_id) this.task_id = obj.task_id;
  }

  mainApp() {
    this.headerHeight = this.appHeaderElement.nativeElement.offsetHeight + "px";
    this.header2Height = (this.appHeaderElement.nativeElement.offsetHeight +
      this.appTableHeaderElement.nativeElement.offsetHeight) + "px";
    if (this.windowVisible) {
      this.WHHeight = this.appNewWindow.nativeElement.offsetHeight + "px";
    }

    let a = 1, b = 1;

    for (let i = 0 ; i < this.tasks.length ; ++i) {
      if (!(this.tasks[i] as any)["t_isComplete"]) {
        this.tasks[i]["t_id"] = a;
        a++;
      }
      else {
        this.tasks[i]["t_id"] = b;
        b++;
      }
    }
  }

  dragTask(obj:any) {
    if (obj.direction == 0) {
      if (!obj.isComplete) {
        this.ss.taskDown(this.incTasks, obj.index);
      }
      else {
        this.ss.taskDown(this.cTasks, obj.index);
      }
    }
    else {
      if (!obj.isComplete) {
        this.ss.taskUp(this.incTasks, obj.index);
      }
      else {
        this.ss.taskUp(this.cTasks, obj.index);
      }
    }
    this.tasks = this.incTasks.concat(this.cTasks);
  }

  deleteTask(obj:any) {
    this.tasks = this.t.deleteTask(obj.index, obj.isComplete);
  }

  returnTask(index:number) {
    this.tasks = this.t.returnTask(index);
    console.log(this.tasks);
  }


  userName = 'username';

  @ViewChild('appHeaderElement', { read: ElementRef }) appHeaderElement: ElementRef;
  @ViewChild('appTableHeaderElement', { read: ElementRef }) appTableHeaderElement: ElementRef;
  @ViewChild('appNewWindow', { read: ElementRef }) appNewWindow: ElementRef;
  @ViewChild('TableRowComponent', { read: ElementRef }) TableRowComponent: ElementRef;

}
