import { Component, OnInit, ViewChild } from '@angular/core';

import { AddAppointmentComponent } from '../add-appointment/add-appointment.component'
import { EditAppointmentComponent } from '../edit-appointment/edit-appointment.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { AppointmentsApiService } from 'projects/hospital/src/app/services/modules-api/appointments-api/appointments-api.service';
// import { AppointmentPrintService } from 'projects/hospital/src/app/services/modules-printing/kitchen-stock-print/kitchen-stock-print.service';


@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.scss']
})
export class AllAppointmentsComponent implements OnInit {

  constructor(
    private appointmentsApi: AppointmentsApiService,
    // private appointmentPrint: AppointmentPrintService
  ) { }

  @ViewChild('addAppointmentComponentReference', { read: AddAppointmentComponent, static: false }) addAppointment!: AddAppointmentComponent;
  @ViewChild('editAppointmentComponentReference', { read: EditAppointmentComponent, static: false }) editAppointment!: EditAppointmentComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Appointments", url: "/home/appointment/all-appointments" },
  ];

  appointmentsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData: boolean =  false;
  isDataAvailable: boolean =  true;

  currentPage = 0;
  totalPages = 0;
  totalAppointments = 0;

  currentSortColumn = "";

  ngOnInit(): void {
    this.getAccountAppointment(1, 20, "-created_at");
  }

  getAccountAppointment(page: any, size: any, sortField: any){
    this.isFetchingGridData = true;

    this.appointmentsApi.getAccountAppointment(page, size, sortField)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.appointmentsGridData = res.results;

          this.currentPage = res.current_page;
          this.totalPages = res.total_pages;
          this.totalAppointments = res.count;

          this.isFetchingGridData = false;
          if(this.totalAppointments == 0)
            this.isDataAvailable = false
          else 
            this.isDataAvailable = true
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  sortTable(column: any){
    console.log(column);
    this.getAccountAppointment(1, 20, column);

    this.currentSortColumn = column;
  }

  postAppointment(data: any){
    console.log(data);
    this.addAppointment.isAppointmentSaving = true;

    this.appointmentsApi.postAppointment(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getAccountAppointment(1, 20, '-created_at');
            this.addAppointment.isAppointmentSaving = false;
            this.addAppointment.addButton.nativeElement.click();
            this.isDataAvailable = false;

            this.addAppointment.resetForm();
          }
        },
        error: (err) => {
          console.log(err);
          this.addAppointment.isAppointmentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  putAppointment(appointment: any){
    console.log(appointment);
    this.editAppointment.isAppointmentSaving = true;

    this.appointmentsApi.putAppointment(appointment.id, appointment.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editAppointment.isAppointmentSaving = false;
          this.editAppointment.editButton.nativeElement.click();
          this.getAccountAppointment(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.addAppointment.isAppointmentSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  deleteAppointment(){
    this.editAppointment.isAppointmentDeleting = true;

    this.appointmentsApi.deleteAppointment(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.editAppointment.isAppointmentDeleting = false;
          this.getAccountAppointment(1, 20, '-created_at');
        },
        error: (err) => {
          console.log(err);
          this.editAppointment.isAppointmentDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  openEditAppointment(data: any){
    console.log(data);
    this.editAppointment.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

  onPrint(){
    console.log("lets start printing...");
    // this.appointmentPrint.printAllAppointments();
  }

}
