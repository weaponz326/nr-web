import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

import { AddMenuItemComponent } from '../add-menu-item/add-menu-item.component'
import { EditMenuItemComponent } from '../edit-menu-item/edit-menu-item.component'
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'

import { MenuApiService } from 'projects/restaurant/src/app/services/modules-api/menu-api/menu-api.service';


@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {

  constructor(
    private menuApi: MenuApiService
  ) { }

  @ViewChild('addMenuItemComponentReference', { read: AddMenuItemComponent, static: false }) addMenuItem!: AddMenuItemComponent;
  @ViewChild('editMenuItemComponentReference', { read: EditMenuItemComponent, static: false }) editMenuItem!: EditMenuItemComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;

  menuItemsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;

  ngOnInit(): void {
    this.getMenuGroupMenuItem();
  }

  getMenuGroupMenuItem(){
    this.isFetchingGridData = true;

    this.menuApi.getMenuGroupMenuItem()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.menuItemsGridData = res;
          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  postMenuItem(menu_item: any){
    console.log(menu_item);
    this.addMenuItem.isMenuItemSaving = true;

    this.menuApi.postMenuItem(menu_item.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.addMenuItem.menuItemForm.image.isImageChanged){
            this.putMenuItemImage(res.id, menu_item.image);
          }
          else{
            this.addMenuItem.dismissButton.nativeElement.click();
            this.addMenuItem.isMenuItemSaving = false;
            this.addMenuItem.menuItemForm.resetForm();
            this.getMenuGroupMenuItem();
          }
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  putMenuItem(menu_item: any){
    this.editMenuItem.isMenuItemSaving = true;
    console.log(menu_item);

    this.menuApi.putMenuItem(menu_item.id, menu_item.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.editMenuItem.menuItemForm.image.isImageChanged){
            this.putMenuItemImage(menu_item.id, menu_item.image);
          }
          else{
            this.editMenuItem.dismissButton.nativeElement.click();
            this.editMenuItem.isMenuItemSaving = false;
            this.editMenuItem.menuItemForm.resetForm();
            this.getMenuGroupMenuItem();          
          }
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  putMenuItemImage(id: string, image: File){
    this.editMenuItem.isMenuItemSaving = true;
    console.log(image);

    this.menuApi.putMenuItemImage(id, image)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          this.addMenuItem.dismissButton.nativeElement.click();
          this.addMenuItem.isMenuItemSaving = false;
          this.addMenuItem.menuItemForm.image.setPlaceholderImage();

          this.editMenuItem.dismissButton.nativeElement.click();
          this.editMenuItem.isMenuItemSaving = false;
          this.editMenuItem.menuItemForm.image.setPlaceholderImage();

          this.getMenuGroupMenuItem();
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  deleteMenuItem(){
    this.editMenuItem.isMenuItemDeleting = true;

    this.menuApi.deleteMenuItem(this.deleteId)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.editMenuItem.isMenuItemDeleting = false;
          this.editMenuItem.dismissButton.nativeElement.click();

          this.getMenuGroupMenuItem()
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
        }
      })
  }

  openEditMenuItem(data: any){
    console.log(data);
    this.editMenuItem.openModal(data);
  }

  confirmDelete(id: any){
    console.log('confirm and lets get rid of it...');

    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
