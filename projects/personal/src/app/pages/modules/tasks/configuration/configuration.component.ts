import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { TasksApiService } from 'projects/personal/src/app/services/modules-api/tasks-api/tasks-api.service';
import { TaskGroupCodeConfig, TaskItemCodeConfig } from 'projects/personal/src/app/models/modules/tasks/tasks.model';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private tasksApi: TasksApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Configuration", url: "/home/tasks/configuration" },
  ];

  isConfigLoading: boolean = false;
  isConfigSaving: boolean = false;

  taskGroupConfigData: any;
  taskItemConfigData: any;

  taskGroupEntryMode = "Auto";
  taskItemEntryMode = "Auto";

  taskGroupPrefix = "";
  taskGroupCodeLength = 0;
  taskGroupSuffix = ""

  taskItemPrefix = "";
  taskItemCodeLength = 0;
  taskItemSuffix = ""

  taskGroupSampleID = "";  
  taskItemSampleID = "";

  ngOnInit(): void {
    this.getTaskGroupCodeConfig();
    this.getTaskItemCodeConfig();
  }

  saveConfig(){
    this.putTaskGroupCodeConfig();
    this.putTaskItemCodeConfig();
  }

  getTaskGroupCodeConfig(){
    this.isConfigLoading = true;

    this.tasksApi.getTaskGroupCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.taskGroupConfigData = res;

          this.taskGroupEntryMode = res.entry_mode;
          this.taskGroupPrefix = res.prefix;
          this.taskGroupSuffix = res.suffix;
          this.taskGroupCodeLength = res.last_code.length

          this.setTaskGroupSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putTaskGroupCodeConfig(){
    let data: TaskGroupCodeConfig = {
      entry_mode: this.taskGroupEntryMode,
      prefix: this.taskGroupPrefix,
      last_code: this.taskGroupConfigData.last_code.padStart(this.taskGroupCodeLength, "0"),
      suffix: this.taskGroupSuffix,
    }

    this.isConfigSaving = true;

    this.tasksApi.putTaskGroupCodeConfig(data)
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

  getTaskItemCodeConfig(){
    this.isConfigLoading = true;

    this.tasksApi.getTaskItemCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.taskItemConfigData = res;

          this.taskItemEntryMode = res.entry_mode;
          this.taskItemPrefix = res.prefix;
          this.taskItemSuffix = res.suffix;
          this.taskItemCodeLength = res.last_code.length

          this.setTaskItemSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putTaskItemCodeConfig(){
    let data: TaskItemCodeConfig = {
      entry_mode: this.taskItemEntryMode,
      prefix: this.taskItemPrefix,
      last_code: this.taskItemConfigData.last_code.padStart(this.taskItemCodeLength, "0"),
      suffix: this.taskItemSuffix,
    }

    this.isConfigSaving = true;

    this.tasksApi.putTaskItemCodeConfig(data)
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

  taskGroupEntryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.taskGroupSampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.taskGroupPrefix = this.taskGroupConfigData.prefix;
      this.taskGroupCodeLength = this.taskGroupConfigData.last_code.length;
      this.taskGroupSuffix = this.taskGroupConfigData.suffix;

      this.setTaskGroupSampleId();
    }
  }

  taskItemEntryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.taskItemSampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.taskItemPrefix = this.taskItemConfigData.prefix;
      this.taskItemCodeLength = this.taskItemConfigData.last_code.length;
      this.taskItemSuffix = this.taskItemConfigData.suffix;

      this.setTaskItemSampleId();
    }
  }

  setTaskGroupSampleId(){
    if(this.taskGroupEntryMode == "Auto"){
      var code = "1".padStart(this.taskGroupCodeLength, "0");
      this.taskGroupSampleID = this.taskGroupPrefix + code + this.taskGroupSuffix;
    }
  }  

  setTaskItemSampleId(){
    if(this.taskItemEntryMode == "Auto"){
      var code = "1".padStart(this.taskItemCodeLength, "0");
      this.taskItemSampleID = this.taskItemPrefix + code + this.taskItemSuffix;
    }
  }

}
