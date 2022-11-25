import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../models/task";

@Component({
  selector: 'app-new-window',
  templateUrl: './new-window.component.html',
  styleUrls: ['./new-window.component.css']
})
export class NewWindowComponent {
  @Input() WHHeight:string = "";
  @Input() tasks: Task[] = [];

  @Input() windowVisible: boolean;
  @Input() windowType: string;
  @Input() task_id: number;

  @Output() taskToApp:EventEmitter<Task[]>= new EventEmitter();
  @Output() closeWindowThis:EventEmitter<{open: boolean, type: string}>= new EventEmitter();

  emitNext(tasks:Task[]) {
    this.tasks = tasks;
    this.taskToApp.emit(this.tasks);
  }

  closeWindow() {
    this.windowVisible = false;
    this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
  }

  onClose(obj:any) {
    this.windowVisible = obj.open;
    this.windowType = obj.type;
    this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
  }

}
