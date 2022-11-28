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
  @Input() cTasks: Task[] = [];
  @Input() incTasks: Task[] = [];

  @Input() windowVisible: boolean;
  @Input() windowType: string;
  @Input() task_id: number;


  @Output() closeWindowThis:EventEmitter<{open: boolean, type: string}>= new EventEmitter();
  @Output() updateTasks:EventEmitter<void>= new EventEmitter();
  @Output() addDeleteInfo:EventEmitter<{addTask: Task, deleteTask: number}>= new EventEmitter();


  closeWindow() {
    this.windowVisible = false;
    this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
  }

  onClose(obj:any) {
    this.windowVisible = obj.open;
    this.windowType = obj.type;
    this.closeWindowThis.emit({open: this.windowVisible, type: this.windowType});
  }

  updateNext() {
    this.updateTasks.emit();
  }

  addDeleteInfoNext(obj: any) {

    this.addDeleteInfo.emit({addTask: obj.addTask , deleteTask: obj.deleteTask} );
  }


}
