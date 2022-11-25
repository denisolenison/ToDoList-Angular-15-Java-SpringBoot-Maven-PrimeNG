import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {incTask, Task} from './models/task';
import { SortsService } from "./services/sorts.service";
import {MyDataService} from "./services/my-data.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  incTasks: Task[] = []/* = dataInc*/;
  cTasks: Task[] = []/* = dataC*/;

  tasks: Task[] = []/* = this.incTasks.concat(this.cTasks)*/;
  task_id: number;

  constructor(private primengConfig: PrimeNGConfig, private ss: SortsService, private t: MyDataService) {
  }

  getAllTasks() {
    this.incTasks = [];
    this.cTasks = [];

    this.tasks = [];
    this.t.getAllTasks(false).subscribe(
      (response: Task[]) => {
        for (let i = 0 ; i < response.length ; ++i) {
          let task = this.t.toIncTaskType(response[i]);
          this.incTasks.push(task);
        }

        this.t.getAllTasks(true).subscribe(
          (response: Task[]) => {
            for (let i = 0 ; i < response.length ; ++i) {
              let task = this.t.toCTaskType(response[i]);
              this.cTasks.push(task);
            }

            this.ss.sortTasks(this.incTasks, 6);
            this.ss.reorderT_ID(this.incTasks);
            this.ss.sortTasks(this.cTasks, 6);
            this.ss.reorderT_ID(this.cTasks);

            this.tasks = this.incTasks.concat(this.cTasks);

            this.ss.sortTasks(this.tasks, 6);
            setInterval(() => {this.mainApp();}, 50);

          },
          (error: HttpErrorResponse) => {
            alert(error.message)
          }
        )


      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )

  }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllTasks();
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
    /*
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
    }*/
  }

  dragTask(obj:any) {
    if (obj.direction == 0) {
      if (!obj.isComplete) {
        this.taskDown(this.incTasks, obj.index, obj.isComplete);
      }
      else {
        this.taskDown(this.cTasks, obj.index, obj.isComplete);
      }
    }
    else {
      if (!obj.isComplete) {
        this.taskUp(this.incTasks, obj.index, obj.isComplete);
      }
      else {
        this.taskUp(this.cTasks, obj.index, obj.isComplete);
      }
    }
  }


  taskDown(data: Task[], index: number, isComplete: boolean) {
    data[index]["t_id"] += 1;
    data[index + 1]["t_id"] -= 1;
    this.letSwap(data[index]["id"], data[index + 1]["id"], data[index], data[index + 1], isComplete);
  }

  taskUp(data: Task[], index: number, isComplete: boolean) {
    data[index]["t_id"] -= 1;
    data[index - 1]["t_id"] += 1;
    this.letSwap(data[index]["id"], data[index - 1]["id"], data[index], data[index - 1], isComplete);
  }

  letSwap(index1: number, index2: number, data1: Task, data2: Task, isComplete: boolean) {
    if (!isComplete) {
      this.t.edit2Tasks(index1, index2, data1, data2, isComplete).subscribe(
        (response: Task[]) => {
          this.ss.reorderT_ID(this.incTasks);
          this.getAllTasks();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log(error);
        }
      );
    }
    else {
      this.t.edit2Tasks(index1, index2, data1, data2, isComplete).subscribe(
        (response: Task[]) => {
          this.ss.reorderT_ID(this.cTasks);
          this.getAllTasks();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


  deleteTask(obj:any) {
      this.t.deleteTask(obj.index, obj.isComplete).subscribe(
        (response: void) => {
          if (obj.isComplete) {
            this.ss.reorderT_ID(this.cTasks);
            this.getAllTasks();
          }
          else {
            this.ss.reorderT_ID(this.incTasks); //Я ***** не понимаю, почему этот ****** реордер не работает
            //console.log(this.incTasks);
            this.getAllTasks();
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    //this.tasks = this.t.deleteTask(obj.index, obj.isComplete);
  }

  returnTask(index:number) {
    let task = this.cTasks[index-1];
    let nTask = new incTask(this.incTasks.length, (this.incTasks.length > 0 ? this.incTasks[this.incTasks.length - 1]["t_id"]+1 : 1), task.t_name, task.t_startDate, task.t_endDate, false);
    this.t.addTask(nTask, false).subscribe(
      (response: Task) => {
        //this.getAllTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.t.deleteTask(this.cTasks[index-1]["id"], true).subscribe(
      (response: void) => {
        this.getAllTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  completeTsk(data: any) {
    this.t.addTask(data.addTask, true).subscribe(
      (response: Task) => {
        //this.getAllTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.t.deleteTask(data.deleteTask, false).subscribe(
      (response: void) => {
        this.getAllTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onUpdate() {
    this.mainApp();
    this.getAllTasks();
  }

  userName = 'username';

  @ViewChild('appHeaderElement', { read: ElementRef }) appHeaderElement: ElementRef;
  @ViewChild('appTableHeaderElement', { read: ElementRef }) appTableHeaderElement: ElementRef;
  @ViewChild('appNewWindow', { read: ElementRef }) appNewWindow: ElementRef;
  @ViewChild('TableRowComponent', { read: ElementRef }) TableRowComponent: ElementRef;

}
