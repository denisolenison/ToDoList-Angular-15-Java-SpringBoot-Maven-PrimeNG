import { Pipe, PipeTransform } from '@angular/core';
import { MonthFormatService } from "../services/month-format.service";

@Pipe({
  name: 'MyDate',
})
export class MyDatePipe implements PipeTransform {

  constructor(private mf: MonthFormatService){}

  transform(date : string): string {
    let thisDate = new Date(date);
    let year: string | number = thisDate.getFullYear();
    let month: string | number = thisDate.getMonth() + 1;
    let day: string | number = thisDate.getDate();
    let hours: string | number = thisDate.getHours();
    let minutes: string | number = thisDate.getMinutes();
    let seconds: string | number = thisDate.getSeconds();
    month = this.mf.formatMonth(month);

    return day + " " + month + " " + year + ", " + this.mf.format00(hours) + ":" + this.mf.format00(minutes) + ":" + this.mf.format00(seconds);
  }

}
