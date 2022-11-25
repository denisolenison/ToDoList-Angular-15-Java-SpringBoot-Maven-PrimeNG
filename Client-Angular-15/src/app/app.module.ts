import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from "primeng/card";
import { BadgeModule } from 'primeng/badge';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TimeGUIComponent } from './components/time-gui/time-gui.component';
import { NewWindowComponent } from './components/new-window/new-window.component';
import { MakeWindowComponent } from './components/new-window/make-window/make-window.component';
import { EditWindowComponent } from './components/new-window/edit-window/edit-window.component';
import { CompleteWindowComponent } from './components/new-window/complete-window/complete-window.component';
import { MyDatePipe } from './pipes/mydate.pipe';
import { MyDateNSPipe } from './pipes/my-date-ns.pipe';
import { MonthFormatService } from "./services/month-format.service";
import { SortsService } from "./services/sorts.service";
import { FormsModule } from "@angular/forms";
import { EditWindowCompleteComponent } from './components/new-window/edit-window-complete/edit-window-complete.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableHeaderComponent,
    TableRowComponent,
    TimeGUIComponent,
    NewWindowComponent,
    MakeWindowComponent,
    EditWindowComponent,
    CompleteWindowComponent,
    MyDatePipe,
    MyDateNSPipe,
    EditWindowCompleteComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AccordionModule,
        PanelModule,
        ButtonModule,
        RippleModule,
        CardModule,
        BadgeModule,
        SkeletonModule,
        InputTextareaModule,
        CalendarModule,
        FormsModule,
        ConfirmDialogModule,
        HttpClientModule
    ],
  providers: [MonthFormatService, SortsService, ConfirmationService],
  bootstrap: [AppComponent]
})



export class AppModule { }
