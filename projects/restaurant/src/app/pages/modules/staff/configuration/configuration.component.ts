import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor() { }

  navHeading: any[] = [
    { text: "Configuration", url: "/home/staff/configuration" },
  ];

  entryMode = "Auto";

  prefix = "";
  codeLength = 5;
  addYear = true;
  yearLength = "two";
  suffix = "ST"

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
    var yearCode: any;

    if(this.addYear == true){
      if(this.yearLength == "two")
        yearCode = new Date().getFullYear().toString().slice(-2)
      else if(this.yearLength == "four")
        yearCode = new Date().getFullYear().toString()
    }
    else{
      yearCode = "";
    }

    this.sampleID = this.prefix + code + yearCode + this.suffix;
  }

  addYearChange(e: any){
    console.log(e.target.checked);

    if(e.target.checked == true){
      this.yearLength = "two";
    }
    else{
      this.yearLength = ""
    }

    this.setSampleId();
  }

}
