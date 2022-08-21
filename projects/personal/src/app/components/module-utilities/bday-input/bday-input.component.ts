import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bday-input',
  templateUrl: './bday-input.component.html',
  styleUrls: ['./bday-input.component.scss']
})
export class BdayInputComponent implements OnInit {

  constructor() { }

  dayInput = "";
  monthInput = "";
  yearInput = "";

  // TODO: to be removed
  value = this.yearInput + "-" + this.monthInput + "-" + this.dayInput;

  dobDaySource = this.getDays();
  dobMonthSource = this.getMonths();
  dobYearSource = this.getYears();

  ngOnInit(): void {
  }

  getValue(){
    let value = this.yearInput + "-" + this.monthInput + "-" + this.dayInput;
    return value;
  }

  setValue(date: any){
    var dateArray = date.split('-');
    this.yearInput = dateArray[0];
    this.monthInput = dateArray[1];
    this.dayInput = dateArray[2];
  }

  getDays(): any[] {
    var doubleDigit, n=[];

    for (let i=1; i<=31; i++) {
      doubleDigit = (i >= 10) ? i.toString() : "0" + i.toString();
      n.push(doubleDigit);
    }

    return n;
  }

  getMonths(): any[] {
    var doubleDigit, n=[];

    for (let i=1; i<=12; i++) {
      doubleDigit = (i >= 10) ? i.toString() : "0" + i.toString();
      n.push(doubleDigit);
    }

    return n;
  }

  getYears(): any[] {
    var i, n=[];
    for (i=2022; i>=1900; i--) n.push(i.toString());
    return n;
  }

}
