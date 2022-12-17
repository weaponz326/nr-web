import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { AppraisalApiService } from 'projects/enterprise/src/app/services/modules-api/appraisal-api/appraisal-api.service';
import { AppraisalSheet } from 'projects/enterprise/src/app/models/modules/appraisal/appraisal.model';


@Component({
  selector: 'app-appraisal-sheet',
  templateUrl: './appraisal-sheet.component.html',
  styleUrls: ['./appraisal-sheet.component.scss']
})
export class AppraisalSheetComponent implements OnInit {

  constructor(private appraisalApi: AppraisalApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  ngOnInit(): void {
  }

  updateAppraisalSheet(){
    var data = {
    }

    console.log(data);

    this.appraisalApi.putAppraisalSheet(data)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteAppraisalSheet(){
    this.appraisalApi.deleteAppraisalSheet()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      }) 
  }

}
