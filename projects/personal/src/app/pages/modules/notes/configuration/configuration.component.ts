import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { NotesApiService } from 'projects/personal/src/app/services/modules-api/notes-api/notes-api.service';
import { NoteCodeConfig } from 'projects/personal/src/app/models/modules/notes/notes.model';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private notesApi: NotesApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "Configuration", url: "/home/note/configuration" },
  ];

  isConfigLoading: boolean = false;
  isConfigSaving: boolean = false;

  configData: any;

  entryMode = "Auto";

  prefix = "";
  codeLength = 0;
  suffix = ""

  sampleID = "";

  ngOnInit(): void {
    this.getNoteCodeConfig();
  }

  getNoteCodeConfig(){
    this.isConfigLoading = true;

    this.notesApi.getNoteCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isConfigLoading = false;
          this.configData = res;

          this.entryMode = res.entry_mode;
          this.prefix = res.prefix;
          this.suffix = res.suffix;
          this.codeLength = res.last_code.length

          this.setSampleId();
        },
        error: (err) => {
          console.log(err);
          this.isConfigLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putNoteCodeConfig(){
    let data: NoteCodeConfig = {
      entry_mode: this.entryMode,
      prefix: this.prefix,
      last_code: this.configData.last_code.padStart(this.codeLength, "0"),
      suffix: this.suffix,
    }

    this.isConfigSaving = true;

    this.notesApi.putNoteCodeConfig(data)
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
      this.suffix = this.configData.suffix

      this.setSampleId();
    }
  }

  setSampleId(){
    if(this.entryMode == "Auto"){
      var code = "1".padStart(this.codeLength, "0");
      this.sampleID = this.prefix + code + this.suffix;
    }
  }

}
