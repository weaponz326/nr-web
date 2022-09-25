import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from 'projects/personal/src/environments/environment';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  @Input() searchResults: any;
  @Input() searchQuery: any;
  @Input() isNextDisabled: any;
  @Input() isPrevDisabled: any;
  @Output() viewDetailEvent = new EventEmitter<string>();
  @Output() nextPageEvent = new EventEmitter<any>();
  @Output() prevPageEvent = new EventEmitter<any>();

  personalUrl = environment.personalUrl;

  ngOnInit(): void {
  }

  viewDetail(userId: any){
    this.viewDetailEvent.emit(userId);
  }

}
