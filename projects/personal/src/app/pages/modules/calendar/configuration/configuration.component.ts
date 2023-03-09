import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CalendarApiService } from 'projects/personal/src/app/services/modules-api/calendar-api/calendar-api.service';
import { CalendarCodeConfig, ScheduleCodeConfig } from 'projects/personal/src/app/models/modules/calendar/calendar.model';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private calendarApi: CalendarApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Configuration", url: "/home/calendar/configuration" },
  ];

  isConfigLoading: boolean = false;
  isConfigSaving: boolean = false;

  calendarConfigData: any;
  scheduleConfigData: any;

  calendarEntryMode = "Auto";
  scheduleEntryMode = "Auto";

  calendarPrefix = "";
  calendarCodeLength = 0;
  calendarSuffix = ""

  schedulePrefix = "";
  scheduleCodeLength = 0;
  scheduleSuffix = ""

  calendarSampleID = "";  
  scheduleSampleID = "";

  ngOnInit(): void {
    this.getCalendarCodeConfig();
    this.getScheduleCodeConfig();
  }

  saveConfig(){
    this.putCalendarCodeConfig();
    this.putScheduleCodeConfig();
  }

  getCalendarCodeConfig(){
    this.isConfigLoading = true;

    this.calendarApi.getCalendarCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.calendarConfigData = res;

          this.calendarEntryMode = res.entry_mode;
          this.calendarPrefix = res.prefix;
          this.calendarSuffix = res.suffix;
          this.calendarCodeLength = res.last_code.length

          this.setCalendarSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putCalendarCodeConfig(){
    let data: CalendarCodeConfig = {
      entry_mode: this.calendarEntryMode,
      prefix: this.calendarPrefix,
      last_code: this.calendarConfigData.last_code.padStart(this.calendarCodeLength, "0"),
      suffix: this.calendarSuffix,
    }

    this.isConfigSaving = true;

    this.calendarApi.putCalendarCodeConfig(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isConfigSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  getScheduleCodeConfig(){
    this.isConfigLoading = true;

    this.calendarApi.getScheduleCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.scheduleConfigData = res;

          this.scheduleEntryMode = res.entry_mode;
          this.schedulePrefix = res.prefix;
          this.scheduleSuffix = res.suffix;
          this.scheduleCodeLength = res.last_code.length

          this.setScheduleSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putScheduleCodeConfig(){
    let data: ScheduleCodeConfig = {
      entry_mode: this.scheduleEntryMode,
      prefix: this.schedulePrefix,
      last_code: this.scheduleConfigData.last_code.padStart(this.scheduleCodeLength, "0"),
      suffix: this.scheduleSuffix,
    }

    this.isConfigSaving = true;

    this.calendarApi.putScheduleCodeConfig(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isConfigSaving = false;
          this.connectionToast.openToast();
        }
      })

    console.log(data);
  }

  calendarEntryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.calendarSampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.calendarPrefix = this.calendarConfigData.prefix;
      this.calendarCodeLength = this.calendarConfigData.last_code.length;
      this.calendarSuffix = this.calendarConfigData.suffix;

      this.setCalendarSampleId();
    }
  }

  scheduleEntryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.scheduleSampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.schedulePrefix = this.scheduleConfigData.prefix;
      this.scheduleCodeLength = this.scheduleConfigData.last_code.length;
      this.scheduleSuffix = this.scheduleConfigData.suffix;

      this.setScheduleSampleId();
    }
  }

  setCalendarSampleId(){
    if(this.calendarEntryMode == "Auto"){
      var code = "1".padStart(this.calendarCodeLength, "0");
      this.calendarSampleID = this.calendarPrefix + code + this.calendarSuffix;
    }
  }  

  setScheduleSampleId(){
    if(this.scheduleEntryMode == "Auto"){
      var code = "1".padStart(this.scheduleCodeLength, "0");
      this.scheduleSampleID = this.schedulePrefix + code + this.scheduleSuffix;
    }
  }

}
