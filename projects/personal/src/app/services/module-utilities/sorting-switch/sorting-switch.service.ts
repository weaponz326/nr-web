import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingSwitchService {

  constructor() { }

  switchSortColumn(allColumns: any, selectedColumn: any){
    allColumns.array.forEach((column: any) => {
      if(selectedColumn != column.field){
        column.value = false;
      }
      else{
        column.value = true;
      }
    });

    return allColumns;
  }

}
