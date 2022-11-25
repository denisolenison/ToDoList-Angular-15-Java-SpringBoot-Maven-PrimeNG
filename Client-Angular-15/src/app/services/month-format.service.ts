import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthFormatService implements OnInit {

  formatMonth (month: string | number) {
    switch(month) {
      case 1: return "января";
      case 2: return "февраля";
      case 3: return "марта";
      case 4: return "апреля";
      case 5: return "мая";
      case 6: return "июня";
      case 7: return "июля";
      case 8: return "августа";
      case 9: return "сентября";
      case 10: return "октября";
      case 11: return "ноября";
      case 12: return "декабря";
      case "1": return "января";
      case "2": return "февраля";
      case "3": return "марта";
      case "4": return "апреля";
      case "5": return "мая";
      case "6": return "июня";
      case "7": return "июля";
      case "8": return "августа";
      case "9": return "сентября";
      case "10": return "октября";
      case "11": return "ноября";
      case "12": return "декабря";
      default: return "незнаюбря";
    }
  }

  format00(num : number) : string {
    if (num < 10) {
      return "0" + num;
    }
    else return num.toString();
  }

  ngOnInit(): void {
    setInterval(() => {this.getCurrentTime();}, 50);
  }

  getCurrentTime() : string {
    return new Date().toISOString();
  }

}
