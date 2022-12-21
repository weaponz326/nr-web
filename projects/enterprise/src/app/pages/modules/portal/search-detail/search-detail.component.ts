import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() searchDetail: any;

  ngOnInit(): void {
  }

  createRink(){
    console.log(this.searchDetail.id);
    sessionStorage.setItem('enterprise_rink_recipient', this.searchDetail.id);
    this.router.navigateByUrl('home/portal/new-rink');
  }

}
