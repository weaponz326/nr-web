import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
// import { SelectStudentComponent } from '../../../select-windows/students-windows/select-student/select-student.component';

// import { ParentsApiService } from 'projects/school/src/app/services/modules/parents-api/parents-api.service';

// import { ParentWard } from 'projects/school/src/app/models/modules/parents/parents.model';


@Component({
  selector: 'app-parent-wards',
  templateUrl: './parent-wards.component.html',
  styleUrls: ['./parent-wards.component.scss']
})
export class ParentWardsComponent implements OnInit {

  constructor(
    private router: Router,
    // private parentsApi: ParentsApiService,
  ) { }

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  // @ViewChild('selectStudentComponentReference', { read: SelectStudentComponent, static: false }) selectStudent!: SelectStudentComponent;

  parentWardsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isWardDeleting = false;

  ngOnInit(): void {
    this.getParentParentWard();
  }

  getParentParentWard(){
    this.isFetchingGridData = true;

    // this.parentsApi.getParentParentWard()
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isFetchingGridData = false;
    //       this.parentWardsGridData = res.docs;
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  createParentWard(wardData: any){
    // let data: ParentWard = {
    let data = {
      parent: sessionStorage.getItem('school_parent_id') as string,
      ward: {
        id: wardData.id,
        data: {
          student_code: wardData.data().student_code,
          first_name: wardData.data().first_name,
          last_name: wardData.data().last_name,
        }
      }
    }

    console.log(data);

    // this.parentsApi.createParentWard(data)
    //   .then(
    //     (res: any) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getParentParentWard();
    //       }
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  deleteParentWard(){
    this.isWardDeleting = true;

    // this.parentsApi.deleteParentWard(this.deleteId)
    //   .then(
    //     (res: any) => {
    //       console.log(res);
    //       this.isWardDeleting = false;
    //       this.getParentParentWard();
    //     },
    //     (err: any) => {
    //       console.log(err);
    //       this.isWardDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   )
  }

  gotoStudent(id: any){
    console.log(id);
    sessionStorage.setItem('school_student_id', id);
    this.router.navigateByUrl('/home/students/view-student');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.modalButton.nativeElement.click();
  }

}
