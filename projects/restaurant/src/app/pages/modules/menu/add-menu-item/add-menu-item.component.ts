import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';

import { MenuItemFormComponent } from '../menu-item-form/menu-item-form.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';
import { MenuItem, MenuGroup } from 'projects/restaurant/src/app/models/modules/menu/menu.model';


@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
export class AddMenuItemComponent implements OnInit {

  constructor(private menuApi: MenuApiService) { }

  @Output() saveMenuItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('menuItemFormComponentReference', { read: MenuItemFormComponent, static: false }) menuItemForm!: MenuItemFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  menuGroupData!: MenuGroup;

  isMenuItemSaving = false;
  
  ngOnInit(): void {
  }

  getNewMenuItemCodeConfig(){
    this.menuItemForm.menuItemForm.controls.itemCode.disable();

    this.menuApi.getNewMenuItemCodeConfig()
      .subscribe({
        next: (res) => {
          console.log(res);

          if(res.code)
            this.menuItemForm.menuItemForm.controls.itemCode.setValue(res.code);
          else
            this.menuItemForm.menuItemForm.controls.itemCode.enable();
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openModal(){
    this.menuItemForm.menuItemForm.controls.price.setValue(1.00);
    this.addButton.nativeElement.click();
    this.getNewMenuItemCodeConfig();
  }

  saveMenuItem(){
    let data = {
      menu_group: sessionStorage.getItem('restaurant_menu_group_id') as string,
      item_code: this.menuItemForm.menuItemForm.controls.itemCode.value as string,
      item_name: this.menuItemForm.menuItemForm.controls.itemName.value as string,
      price: this.menuItemForm.menuItemForm.controls.price.value as number,
      description: this.menuItemForm.menuItemForm.controls.description.value as string,
    }

    let menu_item = {
      data: data,
      image: this.menuItemForm.image.image
    }

    this.saveMenuItemEvent.emit(menu_item);
  }

}
