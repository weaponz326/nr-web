import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';
import { MenuGroup } from 'projects/restaurant/src/app/models/modules/menu/menu.model';


@Component({
  selector: 'app-new-menu-group',
  templateUrl: './new-menu-group.component.html',
  styleUrls: ['./new-menu-group.component.scss']
})
export class NewMenuGroupComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private menuApi: MenuApiService
  ) { }

  @ViewChild('newButtonElementReference', { read: ElementRef, static: false }) newButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  isMenuGroupSaving = false;

  menuGroupForm = new FormGroup({
    menuGroup: new FormControl(''),
    category: new FormControl('')
  })

  ngOnInit(): void {
  }

  openModal(){
    this.newButton.nativeElement.click();
  }

  createMenuGroup(){
    let data: MenuGroup = {
      account: this.customCookie.getCookie('restaurant_id') as string,
      menu_group: this.menuGroupForm.controls.menuGroup.value as string,
      category: this.menuGroupForm.controls.category.value as string
    }

    console.log(data);
    this.isMenuGroupSaving = true;

    this.menuApi.postMenuGroup(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.id){
            sessionStorage.setItem('restaurant_menu_group_id', res.id);
            this.dismissButton.nativeElement.click();
            this.router.navigateByUrl('/home/menu/view-menu-group');
          }
          this.isMenuGroupSaving = false;
        },
        error: (err) => {
          console.log(err);
          this.isMenuGroupSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

}
