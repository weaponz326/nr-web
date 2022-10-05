import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-module-sidenav',
  templateUrl: './module-sidenav.component.html',
  styleUrls: ['./module-sidenav.component.scss']
})
export class ModuleSidenavComponent implements OnInit {

  constructor() { }

  @Input() heading: any;
  @Input() showConf: any = false;
  @Input() navLinks: any[] = [];
  @Output() checkConfigAccess = new EventEmitter<number>();
  
  ngOnInit(): void {
  }

  gotoConfig(e: any){
    e.preventDefault();
    this.checkConfigAccess.emit();
  }

}
