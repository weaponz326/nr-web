import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { Schedule } from 'projects/personal/src/app/models/modules/calendar/calendar.model';


@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {

  constructor() { }

  @Output() saveScheduleEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('scheduleFormComponentReference', { read: ScheduleFormComponent, static: false }) scheduleForm!: ScheduleFormComponent;

  scheduleFormData: any;

  isSaving = false;
  isDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    this.editButton.nativeElement.click();

    this.scheduleFormData = data;

    this.scheduleForm.scheduleForm.controls.scheduleName.setValue(this.scheduleFormData.schedule_name);
    this.scheduleForm.scheduleForm.controls.description.setValue(this.scheduleFormData.description);
    this.scheduleForm.scheduleForm.controls.startDate.setValue(new Date(this.scheduleFormData.start_date).toISOString().slice(0, 16));
    this.scheduleForm.scheduleForm.controls.endDate.setValue(new Date(this.scheduleFormData.end_date).toISOString().slice(0, 16));
    this.scheduleForm.scheduleForm.controls.location.setValue(this.scheduleFormData.location);
    this.scheduleForm.scheduleForm.controls.status.setValue(this.scheduleFormData.status);
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

    let schedule = {
      id: this.scheduleFormData.id,
      data: data
    }

    this.saveScheduleEvent.emit(schedule);
  }

}
