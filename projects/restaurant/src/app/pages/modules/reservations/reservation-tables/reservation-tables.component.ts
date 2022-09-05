import { Component, OnInit, ViewChild } from '@angular/core';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectTableComponent } from '../../../select-windows/tables-windows/select-table/select-table.component';

import { ReservationsApiService } from 'projects/restaurant/src/app/services/modules-api/reservations-api/reservations-api.service';

import { ReservationTable } from 'projects/restaurant/src/app/models/modules/reservations/reservations.model';


@Component({
  selector: 'app-reservation-tables',
  templateUrl: './reservation-tables.component.html',
  styleUrls: ['./reservation-tables.component.scss']
})
export class ReservationTablesComponent implements OnInit {

  constructor(private reservationsApi: ReservationsApiService) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectTableComponentReference', { read: SelectTableComponent, static: false }) selectTable!: SelectTableComponent;

  reservationTablesGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isTableDeleting = false;

  ngOnInit(): void {
    this.getReservationReservationTable();
  }

  getReservationReservationTable(){
    this.isFetchingGridData = true;

    this.reservationsApi.getReservationReservationTable()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isFetchingGridData = false;
          this.reservationTablesGridData = res;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createReservationTable(tableData: any){
    let data: ReservationTable = {
      reservation: sessionStorage.getItem('restaurant_reservation_id') as string,
      table: tableData.id,
    }

    this.reservationsApi.postReservationTable(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            this.getReservationReservationTable();
          }
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  deleteReservationTable(){
    this.isTableDeleting = true;

    this.reservationsApi.deleteReservationTable(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isTableDeleting = false;
          this.getReservationReservationTable();
        },
        error: (err) => {
          console.log(err);
          this.isTableDeleting = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
