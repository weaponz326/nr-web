import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

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

  @ViewChild('modalButtonElementReference', { read: ElementRef, static: false }) modalButton!: ElementRef;

  storageBasePath = "/restaurant/" + localStorage.getItem('restaurant_id') + "/module_menu/";

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
          this.menuItemsGridData = res.docs;
          this.isFetchingGridData = false;
        },
        error: (err) => {
          console.log(err);
          this.isFetchingGridData = false;
          this.connectionToast.openToast();
        }
      })
  }

  createMenuItem(data: any){
    console.log(data);
    this.addMenuItem.isMenuItemSaving = true;

    this.menuApi.postMenuItem(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.getMenuGroupMenuItem();
        },
        error: (err) => {
          console.log(err);

          this.addMenuItem.dismissButton.nativeElement.click();
          this.addMenuItem.isMenuItemSaving = false;

          this.connectionToast.openToast();
        }
      })
  }

  updateMenuItem(menu_item: any){
    this.editMenuItem.isMenuItemSaving = true;
    console.log(menu_item);

    this.menuApi.putMenuItem(menu_item.id, menu_item.data)
      .subscribe({
        next: (res) => {
          console.log(res);

          this.getMenuGroupMenuItem();          
        },
        error: (err) => {
          console.log(err);

          this.editMenuItem.dismissButton.nativeElement.click();
          this.editMenuItem.isMenuItemSaving = false;

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

          this.editMenuItem.isMenuItemDeleting = false;
          this.editMenuItem.dismissButton.nativeElement.click();

          this.connectionToast.openToast();
        }
      })
  }

  openEditMenuItem(data: any){
    console.log(data);
    this.editMenuItem.openModal(data);
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
    this.modalButton.nativeElement.click();
  }

}
