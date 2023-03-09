import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';
import { CodeConfig } from 'projects/personal/src/app/models/code-config/code-config.model';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private menuApi: MenuApiService) { }

  navHeading: any[] = [
    { text: "Configuration", url: "/home/menu/configuration" },
  ];

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isConfigLoading: boolean = false;
  isConfigSaving: boolean = false;

  menuGroupConfigData: any;
  menuItemConfigData: any;

  menuGroupEntryMode = "Auto";
  menuItemEntryMode = "Auto";

  menuGroupPrefix = "";
  menuGroupCodeLength = 0;
  menuGroupSuffix = ""

  menuItemPrefix = "";
  menuItemCodeLength = 0;
  menuItemSuffix = ""
  
  menuGroupSampleID = "";
  menuItemSampleID = "";

  ngOnInit(): void {
    this.getMenuGroupCodeConfig();
    this.getMenuItemCodeConfig();
  }

  saveConfig(){
    this.putMenuGroupCodeConfig();
    this.putMenuItemCodeConfig();
  }

  getMenuGroupCodeConfig(){
    this.isConfigLoading = true;

    this.menuApi.getMenuGroupCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.menuGroupConfigData = res;

          this.menuGroupEntryMode = res.entry_mode;
          this.menuGroupPrefix = res.prefix;
          this.menuGroupSuffix = res.suffix;
          this.menuGroupCodeLength = res.last_code.length

          this.setMenuGroupSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putMenuGroupCodeConfig(){
    let data: CodeConfig = {
      entry_mode: this.menuGroupEntryMode,
      prefix: this.menuGroupPrefix,
      last_code: this.menuGroupConfigData.last_code.padStart(this.menuGroupCodeLength, "0"),
      suffix: this.menuGroupSuffix,
    }

    this.isConfigSaving = true;

    this.menuApi.putMenuGroupCodeConfig(data)
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

  getMenuItemCodeConfig(){
    this.isConfigLoading = true;

    this.menuApi.getMenuItemCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.menuItemConfigData = res;

          this.menuItemEntryMode = res.entry_mode;
          this.menuItemPrefix = res.prefix;
          this.menuItemSuffix = res.suffix;
          this.menuItemCodeLength = res.last_code.length

          this.setMenuItemSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putMenuItemCodeConfig(){
    let data: CodeConfig = {
      entry_mode: this.menuItemEntryMode,
      prefix: this.menuItemPrefix,
      last_code: this.menuItemConfigData.last_code.padStart(this.menuItemCodeLength, "0"),
      suffix: this.menuItemSuffix,
    }

    this.isConfigSaving = true;

    this.menuApi.putMenuItemCodeConfig(data)
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

  menuGroupEntryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.menuGroupSampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.menuGroupPrefix = this.menuGroupConfigData.prefix;
      this.menuGroupCodeLength = this.menuGroupConfigData.last_code.length;
      this.menuGroupSuffix = this.menuGroupConfigData.suffix;

      this.setMenuGroupSampleId();
    }
  }  

  menuItemEntryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.menuItemSampleID = "- - - -";
    }
    else if(e.target.value == "Auto"){
      this.menuItemPrefix = this.menuItemConfigData.prefix;
      this.menuItemCodeLength = this.menuItemConfigData.last_code.length;
      this.menuItemSuffix = this.menuItemConfigData.suffix;

      this.setMenuItemSampleId();
    }
  }

  setMenuGroupSampleId(){
    if(this.menuGroupEntryMode == "Auto"){
      var code = "1".padStart(this.menuGroupCodeLength, "0");
      this.menuGroupSampleID = this.menuGroupPrefix + code + this.menuGroupSuffix;
    }
  }

  setMenuItemSampleId(){
    if(this.menuItemEntryMode == "Auto"){
      var code = "1".padStart(this.menuItemCodeLength, "0");
      this.menuItemSampleID = this.menuItemPrefix + code + this.menuItemSuffix;
    }
  }

}
