import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SortsService } from "../../services/sorts.service";
import { Task } from '../../models/task';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css']
})
export class TableHeaderComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() myData1: Task[];
  @Input() myData2: Task[];

  @Output() outData:EventEmitter<Task[]>= new EventEmitter();
  @Input() myData: Task[];

  constructor(private sort: SortsService) {
  }

  ngOnInit(): void {
    setInterval(() => {this.mainTHeader();}, 50);
  }

  mainTHeader() {
  }

  letSort(type: number) {
    if (this.currentPage == 1) {
      this.sort.sortTasks(this.myData1, type);
    }
    else {
      this.sort.sortTasks(this.myData2, type);
    }
    this.myData = this.myData1.concat(this.myData2);
    this.outData.emit(this.myData);
  }

}
