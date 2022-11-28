import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { incTask, Task } from './models/task';
import { SortsService } from "./services/sorts.service";
import { MyDataService } from "./services/my-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { RU_CONFIG } from "./models/calendar-ru";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit {

  RU_CONFIG = RU_CONFIG;

  incTasks: Task[] = [];
  cTasks: Task[] = [];

  tasks: Task[] = [];
  task_id: number;

  cols: any[];


  taskAction:number = 0;
  //0 - delete 1 - return (for better prompt formatting)
  isActive: boolean;


  constructor(private primengConfig: PrimeNGConfig, private ss: SortsService, private t: MyDataService,
              private confirmationService: ConfirmationService) {
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
            this.ss.reordertaskId(this.incTasks);
            this.ss.sortTasks(this.cTasks, 6);
            this.ss.reordertaskId(this.cTasks);

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

    this.primengConfig.setTranslation(RU_CONFIG);

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

  setWindow(obj: any) {
    this.windowVisible = obj.open;
    this.windowType = obj.type;
    this.task_id = obj.task_id;
  }

  openWindow(open:boolean, type:string, task_id:number) {
    this.windowVisible = open;
    this.windowType = type;
    this.task_id = task_id;
  }

  mainApp() {
    this.headerHeight = this.appHeaderElement.nativeElement.offsetHeight + "px";

    for (let i = 0 ; i < this.incTasks.length ; ++i) {
      this.incTasks[i].getProgress();
    }

    if (this.windowVisible) {
      this.WHHeight = this.appNewWindow.nativeElement.offsetHeight + "px";
    }
  }

  dragTask(index: number, isComplete: boolean, direction: number) {
    if (direction == 0) {
      if (!isComplete) {
        this.taskDown(this.incTasks, index, isComplete);
      }
      else {
        this.taskDown(this.cTasks, index, isComplete);
      }
    }
    else {
      if (!isComplete) {
        this.taskUp(this.incTasks, index, isComplete);
      }
      else {
        this.taskUp(this.cTasks, index, isComplete);
      }
    }
  }


  taskDown(data: Task[], index: number, isComplete: boolean) {
    data[index - 1]["taskId"] += 1;
    data[index]["taskId"] -= 1;
    this.letSwap(data[index - 1]["id"], data[index]["id"], data[index - 1], data[index], isComplete);
  }

  taskUp(data: Task[], index: number, isComplete: boolean) {
    data[index - 1]["taskId"] -= 1;
    data[index - 2]["taskId"] += 1;
    this.letSwap(data[index - 1]["id"], data[index - 2]["id"], data[index - 1], data[index - 2], isComplete);
  }

  letSwap(index1: number, index2: number, data1: Task, data2: Task, isComplete: boolean) {
    if (!isComplete) {
      this.t.edit2Tasks(index1, index2, data1, data2, isComplete).subscribe(
        (response: Task[]) => {
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        },
        () => {
          this.getAllTasks();
        }
      );
    }
    else {
      this.t.edit2Tasks(index1, index2, data1, data2, isComplete).subscribe(
        (response: Task[]) => {
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        },
        () => {
          this.getAllTasks();
        }
      );
    }
  }



  confirmDelete(taskId: number, id: number, isComplete: boolean) {
    this.taskAction = 0;
    this.task_id = taskId;
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить данное задание?',
      accept: () => {
        this.deleteTask({index: id, isComplete: isComplete});
      }
    });
  }

  confirmReturn(taskId: number) {
    this.taskAction = 1;
    this.task_id = taskId;
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите пометить данное задание текущим?',
      accept: () => {
        this.returnTask(taskId);
      }
    });
  }


  deleteTask(obj:any) {
      this.t.deleteTask(obj.index, obj.isComplete).subscribe(
        (response: void) => {
          if (obj.isComplete) {
            this.ss.reordertaskId(this.cTasks);
            this.getAllTasks();
          }
          else {
            this.ss.reordertaskId(this.incTasks);
            this.getAllTasks();
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  returnTask(index:number) {
    let task = this.cTasks[index-1];
    let nTask = new incTask(this.incTasks.length, (this.incTasks.length > 0 ? this.incTasks[this.incTasks.length - 1]["taskId"]+1 : 1), task.taskName, task.taskStartDate, task.taskEndDate, false);
    this.t.addTask(nTask, false).subscribe(
      (response: Task) => {
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



  beginSort(type: number) {
    if (this.currentPage == 1) {
      this.ss.sortTasks(this.incTasks, type);
      this.incTasks = this.ss.reordertaskId(this.incTasks);

      this.t.fullSort(this.incTasks, false);
      this.letSort();
    }
    else {
      this.ss.sortTasks(this.cTasks, type);
      this.cTasks = this.ss.reordertaskId(this.incTasks);

      this.t.fullSort(this.incTasks, true);
      this.letSort();
    }

  }


  letSort() {
    if (this.currentPage == 1) {
      this.t.fullSort(this.incTasks, false).subscribe(
        (response: Task[]) => {

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        },
      () => {
        this.getAllTasks();
        }
      );
    }
    else {
      this.t.fullSort(this.cTasks, true).subscribe(
        (response: Task[]) => {

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        },
        () => {
          this.getAllTasks();
        }
      );
    }
  }

  setColor(thisTask : Task) : any {
    let redColor: string | number = 150;
    let greenColor: string | number  = 150;

    if (thisTask.taskProgress <= 0.7) {
      greenColor = 150;
      redColor = Math.round(150 * (thisTask.taskProgress/0.7));
    }
    else {
      redColor = 150;
      greenColor = Math.round(150 * ((1 - thisTask.taskProgress)/0.3));
    }

    greenColor = greenColor.toString(16);
    redColor = redColor.toString(16);
    if (greenColor.length == 1) greenColor = '0' + greenColor;
    if (redColor.length == 1) redColor = '0' + redColor;

    let thisColor = "#" + redColor + greenColor + "00";
    let thisWidth = Math.round(thisTask.taskProgress * 10000)/100 + "%";
    let isExpired = false;

    if (thisTask.taskProgress >= 1 && !thisTask.taskIsComplete) {
      isExpired = true;
    }

    let isShowable = false;

    if ((this.currentPage == 1 && !thisTask.taskIsComplete) ||
      (this.currentPage == 2 && thisTask.taskIsComplete)) {
      isShowable = true;
    }

    let obj : object = {
      thisColor: thisColor,
      thisWidth: thisWidth,
      isExpired: isExpired,
      isShowable: isShowable,
    }

    return obj;

  }

  onUpdate() {
    this.mainApp();
    this.getAllTasks();
  }

  userName = 'username';

  @ViewChild('appHeaderElement', { read: ElementRef }) appHeaderElement: ElementRef;
  @ViewChild('appNewWindow', { read: ElementRef }) appNewWindow: ElementRef;

}
