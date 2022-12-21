import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
import { SelectStudentComponent } from '../../../../components/select-windows/students-windows/select-student/select-student.component';

import { ParentsApiService } from 'projects/school/src/app/services/modules-api/parents-api/parents-api.service';

import { ParentWard } from 'projects/school/src/app/models/modules/parents/parents.model';


@Component({
  selector: 'app-parent-wards',
  templateUrl: './parent-wards.component.html',
  styleUrls: ['./parent-wards.component.scss']
})
export class ParentWardsComponent implements OnInit {

  constructor(
    private router: Router,
    private parentsApi: ParentsApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  @ViewChild('selectStudentComponentReference', { read: SelectStudentComponent, static: false }) selectStudent!: SelectStudentComponent;

  parentWardsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isWardDeleting = false;

  ngOnInit(): void {
    this.getParentParentWard();
  }

  getParentParentWard(){
    this.isFetchingGridData = true;

    this.parentsApi.getParentParentWard()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.parentWardsGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postParentWard(wardData: any){
    let data: ParentWard = {
      parent: sessionStorage.getItem('school_parent_id') as string,
      ward: wardData.id,
    }

    console.log(data);

    this.parentsApi.postParentWard(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getParentParentWard();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteParentWard(){
    this.isWardDeleting = true;

    this.parentsApi.deleteParentWard(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isWardDeleting = false;
          this.getParentParentWard();
        },
        error: (err) => {
          console.log(err);
          this.isWardDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  gotoStudent(id: any){
    console.log(id);
    sessionStorage.setItem('school_student_id', id);
    this.router.navigateByUrl('/home/students/view-student');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
