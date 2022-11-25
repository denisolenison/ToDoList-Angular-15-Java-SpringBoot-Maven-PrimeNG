import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() outPage:EventEmitter<number> = new EventEmitter();
  @Output() openCreate:EventEmitter<{open: boolean, type: string}> = new EventEmitter();

  @Input() userName:string = "";
  @Input() windowVisible: boolean;
  @Input() windowType: string;

  currentPage: number = 1;

  page1Selected: boolean = true;
  page2Selected: boolean = false;


  ngOnInit(): void {
    setInterval(() => {this.mainHeader();}, 50);
  }

  openTaskWindow() {
    this.windowVisible = true;
    this.windowType = "add";
    this.openCreate.emit({open: this.windowVisible, type: this.windowType});
  }

  mainHeader() {
    if (this.currentPage == 1) {
      this.page1Selected = true;
      this.page2Selected = false;
    }
    else {
      this.page1Selected = false;
      this.page2Selected = true;
    }
  }

  setPage(page:Number) {
    if (page == 1) {
      this.currentPage = 1;
    }
    else if (page == 2) {
      this.currentPage = 2;
    }
    this.outPage.emit(this.currentPage);
  }



}
