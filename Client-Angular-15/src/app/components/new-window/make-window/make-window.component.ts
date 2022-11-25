import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MonthFormatService } from "../../../services/month-format.service";
import { MyDataService } from "../../../services/my-data.service";
import { Task, incTask } from '../../../models/task';

@Component({
  selector: 'app-make-window',
  templateUrl: './make-window.component.html',
  styleUrls: ['./make-window.component.css']
})
export class MakeWindowComponent {

  @Input() tasks: Task[];
  @Output() taskToNW:EventEmitter<Task[]>= new EventEmitter();

  @Input() windowVisible: boolean;
  @Input() windowType: string;
  @Output() closeWindowThis:EventEmitter<{open: boolean, type: string}>= new EventEmitter();

  hasError: boolean = false;
  theError: string = "";

  taskName: string = "";

  startDate: Date = new Date();
  startTime: Date = new Date();

  endDate: Date = new Date((new Date()).valueOf() + 3600000);
  endTime: Date = new Date((new Date()).valueOf() + 3600000);

  constructor(private mf: MonthFormatService, private t: MyDataService){}

  submitTask() {

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

      let task = new incTask(0, this.taskName, date1, date2);

      if (date1.valueOf() >= date2.valueOf()) {
        this.hasError = true;
        this.theError = "Ошибка: дата дедлайна должна быть позже даты начала выполнения задания"
      }

      if (!this.hasError) {
        this.tasks = this.t.addTask(task, false);
        this.taskToNW.emit(this.tasks);
        this.windowVisible = false;
        this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
      }
    }
  }

}
