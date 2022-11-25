import {Component, EventEmitter, Input, Output} from '@angular/core';
import {incTask, Task} from "../../../models/task";
import {MonthFormatService} from "../../../services/month-format.service";
import {MyDataService} from "../../../services/my-data.service";

@Component({
  selector: 'app-complete-window',
  templateUrl: './complete-window.component.html',
  styleUrls: ['./complete-window.component.css']
})
export class CompleteWindowComponent {
  @Input() tasks: Task[];
  @Output() taskToNW:EventEmitter<Task[]>= new EventEmitter();

  @Input() windowVisible: boolean;
  @Input() windowType: string;
  @Input() task_id: number;

  @Output() closeWindowThis:EventEmitter<{open: boolean, type: string}>= new EventEmitter();

  currentDate: Date = new Date();

  hasError: boolean = false;
  theError: string = "";

  taskName: string = "";

  compDate: Date = new Date();
  compTime: Date = new Date();

  constructor(private mf: MonthFormatService, private t: MyDataService){}

  completeTask() {
    this.hasError = false;

    if (this.compDate == undefined || this.compTime == undefined) {
      this.hasError = true;
      this.theError = "Ошибка: введите дату и время выполнения задания";
    }
    if (!this.hasError) {

      let compDt = this.compDate.getFullYear() + "-" + this.mf.format00(this.compDate.getMonth()+1) + "-" + this.mf.format00(this.compDate.getDate());
      let compTm = this.mf.format00(this.compTime.getHours()) + ":" + this.mf.format00(this.compTime.getMinutes()) + ":" + this.mf.format00(this.compTime.getSeconds());

      let date = new Date(compDt + "T" + compTm);

      this.currentDate = new Date();

      if (date.valueOf() >= this.currentDate.valueOf()) {
        this.hasError = true;
        this.theError = "Ошибка: дата выполнения не может быть позже текущей даты"
      }

      if (!this.hasError) {
        this.tasks = this.t.completeTask(this.task_id, date);
        this.taskToNW.emit(this.tasks);
        this.windowVisible = false;
        this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
      }
    }
  }


}
