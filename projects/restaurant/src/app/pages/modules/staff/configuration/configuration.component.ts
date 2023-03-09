import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { StaffApiService } from 'projects/restaurant/src/app/services/modules-api/staff-api/staff-api.service';
import { Staff, StaffCodeConfig } from 'projects/restaurant/src/app/models/modules/staff/staff.model';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private staffApi: StaffApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Configuration", url: "/home/staff/configuration" },
  ];

  isConfigLoading: boolean = false;
  isConfigSaving: boolean = false;

  configData: any;

  entryMode = "Auto";

  prefix = "";
  codeLength = 0;
  addYear = true;
  yearLength = 0;
  suffix = ""

  sampleID = "";

  ngOnInit(): void {
    this.getStaffCodeConfig();
  }

  getStaffCodeConfig(){
    this.isConfigLoading = true;

    this.staffApi.getStaffCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.configData = res;

          this.entryMode = res.entry_mode;
          this.prefix = res.prefix;
          this.suffix = res.suffix;
          this.codeLength = res.last_code.length
          this.yearLength = res.year_code.length

          this.setSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putStaffCodeConfig(){
    let data: StaffCodeConfig = {
      entry_mode: this.entryMode,
      prefix: this.prefix,
      last_code: this.configData.last_code.padStart(this.codeLength, "0"),
      year_code: this.configData.year_code.padStart(this.yearLength, "0"),
      suffix: this.suffix,
    }

    this.isConfigSaving = true;

    this.staffApi.putStaffCodeConfig(data)
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

  entryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.sampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.prefix = this.configData.prefix;
      this.codeLength = this.configData.last_code.length;
      this.yearLength = this.configData.year_code.length;
      this.suffix = this.configData.suffix

      this.setSampleId();
    }
  }

  setSampleId(){
    if(this.entryMode == "Auto"){
      var code = "1".padStart(this.codeLength, "0");
      var yearCode: any;

      if(this.addYear == true){
        if(this.yearLength == 2)
          yearCode = new Date().getFullYear().toString().slice(-2)
        else if(this.yearLength == 4)
          yearCode = new Date().getFullYear().toString()
      }
      else{
        yearCode = "";
      }

      this.sampleID = this.prefix + code + yearCode + this.suffix;
    }
  }

  addYearChange(e: any){
    console.log(e.target.checked);

    if(e.target.checked == true)
      this.yearLength = 2;
    else
      this.yearLength = 0;

    this.setSampleId();
  }

}
