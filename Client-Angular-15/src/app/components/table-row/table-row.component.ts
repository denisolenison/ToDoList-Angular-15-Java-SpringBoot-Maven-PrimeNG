import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../../models/task';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TableRowComponent implements OnInit {

  @Input() thisTask: Task;
  @Input() currentPage: Number;

  taskId: number;
  isActive: boolean;
  thisColor: string = "#009600";
  thisWidth: string = "0%";
  isExpired: boolean = false;

  isShowable: boolean = true;

  taskAction:number = 0;
  //0 - delete 1 - return (for better prompt formatting)

  @Input() isFirst:boolean = false;
  @Input() isLast:boolean = false;

  @Output() dragTask:EventEmitter<{index: number, isComplete: boolean, direction: number}> = new EventEmitter();
  @Output() deleteTask:EventEmitter<{index: number, isComplete: boolean}> = new EventEmitter();
  @Output() returnTask:EventEmitter<number> = new EventEmitter();
  //direction 0 - down, 1 - up
  @Output() openW:EventEmitter<{open: boolean, type: string, task_id: number}> = new EventEmitter();

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.taskId = this.thisTask.id;
    this.isActive = !this.thisTask.t_isComplete;
    setInterval(() => {this.tableMain();}, 50);
  }

  confirmDelete() {
    this.taskAction = 0;
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить данное задание?',
      accept: () => {
        this.deleteTask.emit({index: this.taskId, isComplete: !this.isActive});
      }
    });
  }

  confirmReturn() {
    this.taskAction = 1;
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите пометить данное задание текущим?',
      accept: () => {
        console.log(this.thisTask.t_id);
        this.returnTask.emit(this.thisTask.t_id);
      }
    });
  }

  tableMain() {
    this.getTProgress();
    this.setColor();
    this.taskId = this.thisTask.id;
  }
  getTProgress() {
    this.thisTask.getProgress();
  }

  dragDown(task: Task) {
    let index = task.t_id - 1;
    let isComplete = task.t_isComplete;
    this.dragTask.emit({index: index, isComplete: isComplete, direction: 0});
  }

  dragUp(task: Task) {
    let index = task.t_id - 1;
    let isComplete = task.t_isComplete;
    this.dragTask.emit({index: index, isComplete: isComplete, direction: 1});
  }

  openWindow(open: boolean, type: string, task_id: number) {
    this.openW.emit({open: open, type: type, task_id: task_id});
  }


  setColor() {
    let redColor: string | number = 150;
    let greenColor: string | number  = 150;

    if (this.thisTask.t_progress <= 0.7) {
      greenColor = 150;
      redColor = Math.round(150 * (this.thisTask.t_progress/0.7));
    }
    else {
      redColor = 150;
      greenColor = Math.round(150 * ((1 - this.thisTask.t_progress)/0.3));
    }

    greenColor = greenColor.toString(16);
    redColor = redColor.toString(16);
    if (greenColor.length == 1) greenColor = '0' + greenColor;
    if (redColor.length == 1) redColor = '0' + redColor;

    this.thisColor = "#" + redColor + greenColor + "00";
    this.thisWidth = Math.round(this.thisTask.t_progress * 10000)/100 + "%";

    if (this.thisTask.t_progress >= 1 && !this.thisTask.t_isComplete) {
      this.isExpired = true;
    }
    else {
      this.isExpired = false;
    }

    if ((this.currentPage == 1 && !this.thisTask.t_isComplete) ||
      (this.currentPage == 2 && this.thisTask.t_isComplete)) {
      this.isShowable = true;
    }
    else {
      this.isShowable = false;
    }

  }

}
