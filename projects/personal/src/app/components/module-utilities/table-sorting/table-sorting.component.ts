import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.scss']
})
export class TableSortingComponent implements OnInit {

  constructor() { }

  @Input() sortField: string = "";
  @Input() currentField: string = "";
  @Output() sortDirection = new EventEmitter<string>();

  ngOnInit(): void {
  }

  setSort(direction: any){
    this.sortDirection.emit(direction);

    console.log(this.currentField)
  }

  // TODO: delete
  resetSort(){
    // this.sort = "";
  }
  
}
