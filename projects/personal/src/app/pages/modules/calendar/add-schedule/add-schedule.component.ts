import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component';

import { CalendarApiService } from 'projects/personal/src/app/services/modules-api/calendar-api/calendar-api.service';
import { Schedule } from 'projects/personal/src/app/models/modules/calendar/calendar.model';


@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  constructor(private calendarApi: CalendarApiService) { }

  @Output() reloadScheduleEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('scheduleFormComponentReference', { read: ScheduleFormComponent, static: false }) scheduleForm!: ScheduleFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(date: any){
    this.addButton.nativeElement.click();

    this.scheduleForm.scheduleForm.controls.startDate.setValue(new Date(date).toISOString().slice(0, 16));
    this.scheduleForm.scheduleForm.controls.endDate.setValue(new Date(date).toISOString().slice(0, 16));
  }

  postSchedule(){
    let data: Schedule = {
      calendar: sessionStorage.getItem('personal_calendar_id') as string,
      schedule_name: this.scheduleForm.scheduleForm.controls.scheduleName.value as string,
      description: this.scheduleForm.scheduleForm.controls.description.value as string,
      start_date: this.scheduleForm.scheduleForm.controls.startDate.value,
      end_date: this.scheduleForm.scheduleForm.controls.startDate.value,
      location: this.scheduleForm.scheduleForm.controls.location.value as string,
      status: this.scheduleForm.scheduleForm.controls.status.value as string,
    }

    console.log(data);

    this.isSaving = true;

    this.calendarApi.postSchedule(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('personal_schedule_id', res.id);
            this.reloadScheduleEvent.emit();
            this.dismissButton.nativeElement.click();
            this.resetForm();
          }

          this.isSaving = false;
        },
        error: (err) => {
          this.connectionToast.openToast();
          this.isSaving = false;
          console.log(err);
        }
      })

    this.reloadScheduleEvent.emit();
  }

  resetForm(){
    this.scheduleForm.scheduleForm.controls.scheduleName.setValue('');
    this.scheduleForm.scheduleForm.controls.description.setValue('');
    this.scheduleForm.scheduleForm.controls.startDate.setValue(null);
    this.scheduleForm.scheduleForm.controls.endDate.setValue(null);
    this.scheduleForm.scheduleForm.controls.location.setValue('');
    this.scheduleForm.scheduleForm.controls.status.setValue('');
  }

}
