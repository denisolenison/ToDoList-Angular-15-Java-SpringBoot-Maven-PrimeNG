import {Component, EventEmitter, Input, Output} from '@angular/core';
import {cTask, Task} from "../../../models/task";
import {MonthFormatService} from "../../../services/month-format.service";
import {MyDataService} from "../../../services/my-data.service";

@Component({
  selector: 'app-edit-window-complete',
  templateUrl: './edit-window-complete.component.html',
  styleUrls: ['./edit-window-complete.component.css']
})
export class EditWindowCompleteComponent {
  @Input() tasks: Task[];
  @Output() taskToNW:EventEmitter<Task[]>= new EventEmitter();

  @Input() windowVisible: boolean;
  @Input() windowType: string;
  @Input() task_id: number;

  @Output() closeWindowThis:EventEmitter<{open: boolean, type: string}>= new EventEmitter();

  currentDate: Date = new Date();

  hasError: boolean = false;
  theError: string = "";

  constructor(private mf: MonthFormatService, private t: MyDataService){

  }

  taskName: string;

  startDate: Date;
  startTime: Date;

  endDate: Date;
  endTime: Date;

  deadDate: Date;

  ngOnInit(): void {
    this.taskName = this.t.getTask(this.task_id, true).t_name;

    this.startDate = this.t.getTask(this.task_id, true).t_startDate;
    this.startTime = this.t.getTask(this.task_id, true).t_startDate;

    this.deadDate = this.t.getTask(this.task_id, true).t_endDate;

    this.endDate = this.t.getTask(this.task_id, true).t_completeDate;
    this.endTime = this.t.getTask(this.task_id, true).t_completeDate;
  }

  editTask() {

    this.hasError = false;

    if (this.taskName.length == 0) {
      this.hasError = true;
      this.theError = "Ошибка: введите название задания";
    }
    else if (this.startDate == undefined || this.startTime == undefined) {
      this.hasError = true;
      this.theError = "Ошибка: введите дату и время начала задания";
    }
    else if (this.endDate == undefined || this.endTime == undefined) {
      this.hasError = true;
      this.theError = "Ошибка: введите дату и время выполнения задания";
    }
    if (!this.hasError) {

      let startDt = this.startDate.getFullYear() + "-" + this.mf.format00(this.startDate.getMonth() + 1) + "-" + this.mf.format00(this.startDate.getDate());
      let startTm = this.mf.format00(this.startTime.getHours()) + ":" + this.mf.format00(this.startTime.getMinutes()) + ":" + this.mf.format00(this.startTime.getSeconds());

      let endDt = this.endDate.getFullYear() + "-" + this.mf.format00(this.endDate.getMonth() + 1) + "-" + this.mf.format00(this.endDate.getDate());
      let endTm = this.mf.format00(this.endTime.getHours()) + ":" + this.mf.format00(this.endTime.getMinutes()) + ":" + this.mf.format00(this.endTime.getSeconds());

      let date1 = new Date(startDt + "T" + startTm);
      let date2 = new Date(endDt + "T" + endTm);

      /*
      if (date1.valueOf() >= date2.valueOf()) {
        this.hasError = true;
      }*/ //можно выполнить задание даже до начала его выполнения

      if (date2.valueOf() >= (new Date()).valueOf()) {
        this.hasError = true;
        this.theError = "Дата выполнения не может быть позже текущей даты";
      }

      if (!this.hasError) {
        if (date1.valueOf() > this.deadDate.valueOf()) {
          this.deadDate = date1;
        }

        let task = new cTask(this.task_id, this.taskName, date1, this.deadDate, true, date2);

        this.tasks = this.t.editTask(this.task_id, task, true);
        this.taskToNW.emit(this.tasks);
        this.windowVisible = false;
        this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
      }
    }
  }
}
