import { Pipe, PipeTransform } from '@angular/core';
import { MonthFormatService } from "../services/month-format.service";

@Pipe({
  name: 'MyDate',
})
export class MyDatePipe implements PipeTransform {

  constructor(private mf: MonthFormatService){}

  transform(date : Date): string {
    let year: string | number = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    let hours: string | number = date.getHours();
    let minutes: string | number = date.getMinutes();
    let seconds: string | number = date.getSeconds();
    month = this.mf.formatMonth(month);

    return day + " " + month + " " + year + ", " + this.mf.format00(hours) + ":" + this.mf.format00(minutes) + ":" + this.mf.format00(seconds);
  }

}
