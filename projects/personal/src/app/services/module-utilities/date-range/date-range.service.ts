import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DateRangeService {

  constructor() { }

  getDateRange (startDate: Date, endDate: Date) {
    const dates = [];
    const date = new Date(startDate);
   
    while (date <= endDate) {
      // dates.push(new Date(date));
      dates.push(formatDate(date, 'yyyy-MM-dd', 'en-US'));
      
      date.setDate(date.getDate() + 1);
    }
   
    return dates;
   }

}
