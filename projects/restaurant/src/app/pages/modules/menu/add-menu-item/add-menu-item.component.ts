import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';

import { MenuItemFormComponent } from '../menu-item-form/menu-item-form.component'

import { MenuItem, MenuGroup } from 'projects/restaurant/src/app/models/modules/menu/menu.model';


@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
export class AddMenuItemComponent implements OnInit {

  constructor() { }

  @Output() saveMenuItemEvent = new EventEmitter<any>();

  @ViewChild('addButtonElementReference', { read: ElementRef, static: false }) addButton!: ElementRef;
  @ViewChild('dismissButtonElementReference', { read: ElementRef, static: false }) dismissButton!: ElementRef;

  @ViewChild('menuItemFormComponentReference', { read: MenuItemFormComponent, static: false }) menuItemForm!: MenuItemFormComponent;

  menuGroupData!: MenuGroup;

  isMenuItemSaving = false;

  ngOnInit(): void {
  }

  openModal(){
    this.menuItemForm.menuItemForm.controls.price.setValue(1.00);
    this.addButton.nativeElement.click();
  }

  saveMenuItem(){
    let data: MenuItem = {
      menu_group: sessionStorage.getItem('restaurant_menu_group_id') as string,
      item_code: this.menuItemForm.menuItemForm.controls.itemCode.value as string,
      item_name: this.menuItemForm.menuItemForm.controls.itemName.value as string,
      price: this.menuItemForm.menuItemForm.controls.price.value as number,
      image: this.menuItemForm.image.image,
      description: this.menuItemForm.menuItemForm.controls.description.value as string,
    }

    this.saveMenuItemEvent.emit(data);
  }

  resetForm(){
    this.menuItemForm.menuItemForm.controls.itemCode.setValue('');
    this.menuItemForm.menuItemForm.controls.itemName.setValue('');
    this.menuItemForm.menuItemForm.controls.price.setValue(1.00);
    this.menuItemForm.image.setPlaceholderImage();
    this.menuItemForm.menuItemForm.controls.description.setValue('');
  }

}
