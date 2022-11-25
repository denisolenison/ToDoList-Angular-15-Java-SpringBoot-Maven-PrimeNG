import {Component, OnInit} from '@angular/core';
import {MonthFormatService} from "../../services/month-format.service";

@Component({
  selector: 'app-time-gui',
  templateUrl: './time-gui.component.html',
  styleUrls: ['./time-gui.component.css'],
  providers: [MonthFormatService]
})
export class TimeGUIComponent implements OnInit {
  constructor(private mf: MonthFormatService){}

  currentDate : string = new Date().toISOString().split('Z')[0];

  ngOnInit(): void {
    setInterval(() => {this.getCurrentTime();}, 50);
  }

  getCurrentTime() : void {
    this.currentDate = this.mf.getCurrentTime();
  }
}
