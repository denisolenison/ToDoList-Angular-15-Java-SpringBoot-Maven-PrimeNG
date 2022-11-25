import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {incTask, Task} from "../../../models/task";
import {MonthFormatService} from "../../../services/month-format.service";
import {MyDataService} from "../../../services/my-data.service";

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
  styleUrls: ['./edit-window.component.css']
})
export class EditWindowComponent implements OnInit {
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

  ngOnInit(): void {
    this.taskName = this.t.getTask(this.task_id, false).t_name;

    this.startDate = this.t.getTask(this.task_id, false).t_startDate;
    this.startTime = this.t.getTask(this.task_id, false).t_startDate;

    this.endDate = this.t.getTask(this.task_id, false).t_endDate;
    this.endTime = this.t.getTask(this.task_id, false).t_endDate;
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
      this.theError = "Ошибка: введите дату и время дедлайна";
    }
    if (!this.hasError) {

      let startDt = this.startDate.getFullYear() + "-" + this.mf.format00(this.startDate.getMonth()+1) + "-" + this.mf.format00(this.startDate.getDate());
      let startTm = this.mf.format00(this.startTime.getHours()) + ":" + this.mf.format00(this.startTime.getMinutes()) + ":" + this.mf.format00(this.startTime.getSeconds());

      let endDt = this.endDate.getFullYear() + "-" + this.mf.format00(this.endDate.getMonth()+1) + "-" + this.mf.format00(this.endDate.getDate());
      let endTm = this.mf.format00(this.endTime.getHours()) + ":" + this.mf.format00(this.endTime.getMinutes()) + ":" + this.mf.format00(this.endTime.getSeconds());

      let date1 = new Date(startDt + "T" + startTm);
      let date2 = new Date(endDt + "T" + endTm);

      let task = new incTask(this.task_id, this.taskName, date1, date2);

      if (date1.valueOf() >= date2.valueOf()) {
        this.hasError = true;
        this.theError = "Ошибка: дата дедлайна должна быть позже даты начала выполнения задания"
      }

      if (!this.hasError) {
        this.tasks = this.t.editTask(this.task_id, task, false);
        this.taskToNW.emit(this.tasks);
        this.windowVisible = false;
        this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
      }
    }
  }


}
