import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AccessToastComponent } from 'projects/personal/src/app/components/module-utilities/access-toast/access-toast.component';


@Component({
  selector: 'app-module-sidenav',
  templateUrl: './module-sidenav.component.html',
  styleUrls: ['./module-sidenav.component.scss']
})
export class ModuleSidenavComponent implements OnInit {

  constructor() { }

  @Input() heading: any;
  @Input() suite: any;
  @Input() showConf: any = false;
  @Input() navLinks: any[] = [];
  @Output() gotoConfig = new EventEmitter<number>();
  
  @ViewChild('accessToastComponentReference', { read: AccessToastComponent, static: false }) accessToast!: AccessToastComponent;

  accessLevel = 'Staff';

  ngOnInit(): void {
  }

  checkConfigAccess(e: any){
    e.preventDefault();

    if(this.suite == 'Personal')
      this.accessLevel = 'Admin';
    else if(this.suite == 'Restaurant')
      this.accessLevel = JSON.parse(localStorage.getItem('restaurantUserLevel') as string).access_level;
    else if(this.suite == 'School')
      this.accessLevel = JSON.parse(localStorage.getItem('schoolUserLevel') as string).access_level;
    else if(this.suite == 'Association')
      this.accessLevel = JSON.parse(localStorage.getItem('associationUserLevel') as string).access_level;
    else if(this.suite == 'Enterprise')
      this.accessLevel = JSON.parse(localStorage.getItem('enterpriseUserLevel') as string).access_level;
    else if(this.suite == 'Hotel')
      this.accessLevel = JSON.parse(localStorage.getItem('hotelUserLevel') as string).access_level;
    else if(this.suite == 'Hospital')
      this.accessLevel = JSON.parse(localStorage.getItem('hospitalUserLevel') as string).access_level;
    else if(this.suite == 'Shop')
      this.accessLevel = JSON.parse(localStorage.getItem('shopUserLevel') as string).access_level;
    else if(this.suite == 'Production')
      this.accessLevel = JSON.parse(localStorage.getItem('productionUserLevel') as string).access_level;

    if (this.accessLevel != "Staff"){
      console.log("Access granted :)");
      this.gotoConfig.emit();
    }
    else{
      console.log("Access denied :(");
      this.accessToast.openToast();
    }
  }
    
}
