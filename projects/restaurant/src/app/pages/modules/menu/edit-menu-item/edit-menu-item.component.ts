import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { MenuItemFormComponent } from '../menu-item-form/menu-item-form.component'

import { MenuItem } from 'projects/restaurant/src/app/models/modules/menu/menu.model';
import { environment } from 'projects/personal/src/environments/environment';


@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.scss']
})
export class EditMenuItemComponent implements OnInit {

  constructor() { }

  @Output() saveMenuItemEvent = new EventEmitter<any>();
  @Output() deleteMenuItemEvent = new EventEmitter<any>();

  @ViewChild('editButtonElementReference', { read: ElementRef, static: false }) editButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('menuItemFormComponentReference', { read: MenuItemFormComponent, static: false }) menuItemForm!: MenuItemFormComponent;

  menuItemData: any;

  isMenuItemSaving = false;
  isMenuItemDeleting = false;

  ngOnInit(): void {
  }

  openModal(data: any){
    console.log(data);
    this.menuItemData = data;

    this.menuItemForm.menuItemForm.controls.itemCode.setValue(data.item_code);
    this.menuItemForm.menuItemForm.controls.itemName.setValue(data.item_name);
    this.menuItemForm.menuItemForm.controls.price.setValue(data.price);
    this.menuItemForm.menuItemForm.controls.description.setValue(data.description);

    if (data.image != null)
      this.menuItemForm.image.imgSrc = environment.apiUrl + data.image;
    else
      this.menuItemForm.image.imgSrc = 'assets/images/utilities/logo-placeholder.jpg';

    this.editButton.nativeElement.click();
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
      id: this.menuItemData.id,
      data: data,
      image: this.menuItemForm.image.image
    }

    this.saveMenuItemEvent.emit(menu_item);
  }

  deleteMenuItem(){
    this.deleteMenuItemEvent.emit(this.menuItemData.id);
  }

}
