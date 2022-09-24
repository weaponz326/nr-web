import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { Schedule } from 'projects/personal/src/app/models/modules/calendar/calendar.model';


@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  constructor() { }

  @Output() saveScheduleEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('scheduleFormComponentReference', { read: ScheduleFormComponent, static: false }) scheduleForm!: ScheduleFormComponent;

  isSaving = false;

  ngOnInit(): void {
  }

  openModal(date: any){
    this.addButton.nativeElement.click();

    this.scheduleForm.scheduleForm.controls.startDate.setValue(new Date(date).toISOString().slice(0, 16));
    this.scheduleForm.scheduleForm.controls.endDate.setValue(new Date(date).toISOString().slice(0, 16));
  }

  saveSchedule(){
    let data: Schedule = {
      calendar: sessionStorage.getItem('personal_calendar_id') as string,
      schedule_name: this.scheduleForm.scheduleForm.controls.scheduleName.value as string,
      description: this.scheduleForm.scheduleForm.controls.description.value as string,
      start_date: this.scheduleForm.scheduleForm.controls.startDate.value,
      end_date: this.scheduleForm.scheduleForm.controls.startDate.value,
      location: this.scheduleForm.scheduleForm.controls.location.value as string,
      status: this.scheduleForm.scheduleForm.controls.status.value as string,
    }

    this.saveScheduleEvent.emit(data);
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
