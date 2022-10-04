import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  navHeading: any[] = [
    { text: "Configuration", url: "/home/roster/configuration" },
  ];

  entryMode = "Auto";

  prefix = "";
  codeLength = 5;
  suffix = "RS"

  sampleID = "";

  ngOnInit(): void {
    this.setSampleId();
  }

  entryModeChange(e: any){
    console.log(e.target.value);

    if(e.target.value == "Manual"){
      this.prefix = "";
      this.codeLength = 0;
      this.suffix = ""

      this.sampleID = "";
    }
    else if(e.target.value == "Auto"){
      this.prefix = "";
      this.codeLength = 5;
      this.suffix = "MN"

      this.setSampleId();
    }
  }

  setSampleId(){
    var code = "1".padStart(this.codeLength, "0");
    this.sampleID = this.prefix + code + this.suffix;
  }

}
