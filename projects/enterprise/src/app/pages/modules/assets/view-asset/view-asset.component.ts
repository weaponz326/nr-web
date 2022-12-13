import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AssetFormComponent } from '../asset-form/asset-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss']
})
export class ViewAssetComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
  ) { }

  @ViewChild('assetFormComponentReference', { read: AssetFormComponent, static: false }) assetForm!: AssetFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Assets", url: "/home/asset/all-assets" },
    { text: "View Asset", url: "/home/asset/view-asset" },
  ];

  assetData: any;

  isAssetLoading = false;
  isAssetSaving = false;
  isAssetDeleting = false;

  isActiveAssetSaving = false;

  ngOnInit(): void {
    this.getAsset();
  }

  getAsset(){
    this.isAssetLoading = true;

    
  }

  updateAsset(){
    console.log('u are saving a new asset');

    var data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      asset_number: this.assetForm.assetForm.controls.assetNumber.value as string,
      asset_name: this.assetForm.assetForm.controls.assetName.value as string,
      category: this.assetForm.assetForm.controls.category.value as string,
      type: this.assetForm.assetForm.controls.type.value as string,
      model: this.assetForm.assetForm.controls.model.value as string,
      description: this.assetForm.assetForm.controls.description.value as string,
      date_purchased: this.assetForm.assetForm.controls.datePurchased.value,
      status: this.assetForm.assetForm.controls.status.value as string,
    }

    console.log(data);
    this.isAssetSaving = true;

    
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteAsset(){
    this.isAssetDeleting = true;

    
  }

  putActiveAsset(){
    this.isActiveAssetSaving = true;

    let data = {
      account: this.customCookie.getCookie('enterprise_id') as string,
      asset: sessionStorage.getItem('enterprise_asset_id') as string,
    };

    console.log(data);

    
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assetsPrint.printViewAsset();
  }


}
