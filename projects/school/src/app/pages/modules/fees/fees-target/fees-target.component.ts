import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectClassComponent } from '../../../select-windows/classes-windows/select-class/select-class.component';

import { FeesApiService } from 'projects/school/src/app/services/modules-api/fees-api/fees-api.service';
import { FeesTarget } from 'projects/school/src/app/models/modules/fees/fees.model';


@Component({
  selector: 'app-fees-target',
  templateUrl: './fees-target.component.html',
  styleUrls: ['./fees-target.component.scss']
})
export class FeesTargetComponent implements OnInit {

  constructor(
    private router: Router,
    private feesApi: FeesApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectClassComponentReference', { read: SelectClassComponent, static: false }) selectClass!: SelectClassComponent;

  feesTargetsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isTargetDeleting = false;

  ngOnInit(): void {
    this.getFeesFeesTarget();
  }

  getFeesFeesTarget(){
    this.isFetchingGridData = true;

    this.feesApi.getFeesFeesTarget()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.feesTargetsGridData = res.docs;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postFeesTarget(classData: any){
    let data: FeesTarget = {
      fees: sessionStorage.getItem('school_fees_id') as string,
      clase: classData.id,
    }

    this.feesApi.postFeesTarget(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getFeesFeesTarget();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteFeesTarget(){
    this.isTargetDeleting = true;

    this.feesApi.deleteFeesTarget(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTargetDeleting = false;
          this.getFeesFeesTarget();
        },
        error: (err) => {
          console.log(err);
          this.isTargetDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
