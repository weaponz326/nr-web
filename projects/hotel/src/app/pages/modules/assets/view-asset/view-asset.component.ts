import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AssetFormComponent } from '../asset-form/asset-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { AssetsApiService } from 'projects/hotel/src/app/services/modules-api/assets-api/assets-api.service';

// import { Asset } from 'projects/hotel/src/app/models/modules/assets/assets.model';


@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss']
})
export class ViewAssetComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private assetsApi: AssetsApiService
  ) { }

  @ViewChild('assetFormComponentReference', { read: AssetFormComponent, static: false }) assetForm!: AssetFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Assets", url: "/home/assets/all-assets" },
    { text: "View Asset", url: "/home/assets/view-asset" },
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

    // this.assetsApi.getAsset()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.assetData = res;
    //       this.isAssetLoading = false;

    //       this.assetForm.assetForm.controls.assetNumber.setValue(this.assetData.asset_number);
    //       this.assetForm.assetForm.controls.assetName.setValue(this.assetData.asset_name);          
    //       this.assetForm.assetForm.controls.category.setValue(this.assetData.category);          
    //       this.assetForm.assetForm.controls.type.setValue(this.assetData.type);          
    //       this.assetForm.assetForm.controls.model.setValue(this.assetData.model);          
    //       this.assetForm.assetForm.controls.description.setValue(this.assetData.description);          
    //       this.assetForm.assetForm.controls.datePurchased.setValue(this.assetData.date_purchased);          
    //       this.assetForm.assetForm.controls.condition.setValue(this.assetData.condition);          
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isAssetLoading = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  updateAsset(){
    console.log('u are saving a new asset');

    // var data: Asset = {
    var data = {
        account: this.customCookie.getCookie('hotel_id') as string,
        asset_number: this.assetForm.assetForm.controls.assetNumber.value as string,
        asset_name: this.assetForm.assetForm.controls.assetName.value as string,
        category: this.assetForm.assetForm.controls.category.value as string,
        type: this.assetForm.assetForm.controls.type.value as string,
        model: this.assetForm.assetForm.controls.model.value as string,
        description: this.assetForm.assetForm.controls.description.value as string,
        date_purchased: this.assetForm.assetForm.controls.datePurchased.value,
        condition: this.assetForm.assetForm.controls.condition.value as string,
      }

    console.log(data);
    this.isAssetSaving = true;

    // this.assetsApi.putAsset(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isAssetSaving = false;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isAssetSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteAsset(){
    this.isAssetDeleting = true;

    // this.assetsApi.deleteAsset()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/assets/all-assets');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.assetsPrint.printViewAsset();
  }

}
