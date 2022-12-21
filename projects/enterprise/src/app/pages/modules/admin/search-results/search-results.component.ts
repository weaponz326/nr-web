import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchResults: any;
  @Input() searchQuery: any;
  @Input() isNextDisabled: any;
  @Input() isPrevDisabled: any;
  @Output() viewDetailEvent = new EventEmitter<string>();
  @Output() nextPageEvent = new EventEmitter<any>();
  @Output() prevPageEvent = new EventEmitter<any>();
  
  ngOnInit(): void {
  }

  viewDetail(userId: any){
    this.viewDetailEvent.emit(userId);
  }

}
