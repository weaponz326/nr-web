import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// import { SelectMenuItemComponent } from '../../../select-windows/menu-windows/select-menu-item/select-menu-item.component';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  constructor() { }

  // @ViewChild('selectMenuItemComponentReference', { read: SelectMenuItemComponent, static: false }) selectMenuItem!: SelectMenuItemComponent;

  selectedMenuItemId = "";
  selectedMenuItemData: any;

  itemForm = new FormGroup({
    menuItem: new FormControl({value: "", disabled: true}),
    price: new FormControl({value: 0, disabled: true}),
    quantity: new FormControl(1)
  })

  ngOnInit(): void {
  }

  openMenuItemWindow(){
    console.log("You are opening select menu item window")
    // this.selectMenuItem.openModal();
  }

  onMenuItemSelected(itemData: any){
    console.log(itemData);
    this.selectedMenuItemId = itemData.id;
    this.selectedMenuItemData = itemData;

    this.itemForm.controls.menuItem.setValue(itemData.item_name);
    this.itemForm.controls.price.setValue(itemData.price);
  }

}
