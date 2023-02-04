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

  ngOnInit(): void {
  }

}
