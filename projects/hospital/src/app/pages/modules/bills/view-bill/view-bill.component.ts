import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'
import { BillTablesComponent } from '../bill-tables/bill-tables.component';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { BillsApiService } from 'projects/hospital/src/app/services/modules-api/bills-api/bills-api.service';
// import { BillsPrintService } from 'projects/hospital/src/app/services/modules-printing/bills-print/bills-print.service';

// import { Bill } from 'projects/hospital/src/app/models/modules/bills/bills.model';


@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private billsApi: BillsApiService,
    // private billsPrint: BillsPrintService
  ) { }

  @ViewChild('existButtonElementReference', { read: ElementRef, static: false }) existButtonElement!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;
  @ViewChild('billTablesComponentReference', { read: BillTablesComponent, static: false }) billTables!: BillTablesComponent;

  navHeading: any[] = [
    { text: "All Bills", url: "/home/bills/all-bills" },
    { text: "View Bill", url: "/home/bills/view-bill" },
  ];

  billFormData: any;

  selectedCustomerId = "";
  selectedCustomerName = "";
  selectedTableId = "";

  isBillLoading: boolean = false;
  isBillSaving: boolean = false;
  isBillDeleting: boolean = false;
  isCheckingDelivery: boolean = false;

  billForm = new FormGroup({
    billCode: new FormControl(''),
    billDate: new FormControl(),
    patientName: new FormControl(''),
    patientNumber: new FormControl(''),
    admissionCode: new FormControl(''),
    billStatus: new FormControl(''),
  })

  ngOnInit(): void {
    this.getBill();
  }

  getBill(){
    this.isBillLoading = true;

    this.billsApi.getBill()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.billFormData = res;
          this.isBillLoading = false;

          this.billForm.controls.billCode.setValue(this.billFormData.bill_code);
          this.billForm.controls.billDate.setValue(new Date(this.billFormData.bill_date).toISOString().slice(0, 16));
          this.billForm.controls.billStatus.setValue(this.billFormData.bill_status);
        },
        error: (err) => {
          console.log(err);
          this.isBillLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putBill(){
    // let data: Bill = {
      let data = {
        account: this.customCookie.getCookie('hospital_id') as string,
        bill_code: this.billForm.controls.billCode.value as string,
        bill_date: this.billForm.controls.billDate.value as string,
        bill_status: this.billForm.controls.billStatus.value as string,
      }

    console.log(data);
    this.isBillSaving = true;

    this.billsApi.putBill(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isBillSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isBillSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteBill(){
    this.isBillDeleting = true;

    this.billsApi.deleteBill()
      .subscribe({
        next: (res) => {
          console.log(res);

          this.router.navigateByUrl('/home/bills/all-bills');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.billsPrint.printViewBill();
  }

  onPrintRoll(){
    console.log("lets start printing roll...");
    // this.billsPrint.printBillRoll();
  }

}
