import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { SortsService } from "../../services/sorts.service";
import { Task } from '../../models/task';
import {HttpErrorResponse} from "@angular/common/http";
import {MyDataService} from "../../services/my-data.service";

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

  constructor(private sort: SortsService, private t: MyDataService) {
  }

  ngOnInit(): void {
    setInterval(() => {this.mainTHeader();}, 50);
  }

  mainTHeader() {
  }

  beginSort(type: number) {
    if (this.currentPage == 1) {
      this.sort.sortTasks(this.myData1, type);
      this.myData1 = this.sort.reorderT_ID(this.myData1);

      this.t.fullSort(this.myData1, false);
      this.letSort();
    }
    else {
      this.sort.sortTasks(this.myData2, type);
      this.myData2 = this.sort.reorderT_ID(this.myData2);

      this.t.fullSort(this.myData2, true);
      this.letSort();
    }

  }


  letSort() {
    if (this.currentPage == 1) {
      this.t.fullSort(this.myData1, false).subscribe(
        (response: Task[]) => {
          this.outData.emit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    else {
      this.t.fullSort(this.myData2, true).subscribe(
        (response: Task[]) => {
          this.outData.emit();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

}
