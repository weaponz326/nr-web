import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AssetFormComponent } from '../asset-form/asset-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { AssetsApiService } from 'projects/hotel/src/app/services/modules-api/assets-api/assets-api.service';

// import { Asset } from 'projects/hotel/src/app/models/modules/assets/assets.model';


@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrls: ['./new-asset.component.scss']
})
export class NewAssetComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private assetsApi: AssetsApiService
  ) { }

  @ViewChild('assetFormComponentReference', { read: AssetFormComponent, static: false }) assetForm!: AssetFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Asset", url: "/home/assets/new-asset" },
  ];

  isAssetSaving = false;

  ngOnInit(): void {
    this.getNewAssetCodeConfig();
  }

  postAsset(){
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

    // this.assetsApi.postAsset(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isAssetSaving = false;

    //       sessionStorage.setItem('hotel_asset_id', res.id);
    //       this.router.navigateByUrl('/home/assets/view-asset');
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isAssetSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewAssetCodeConfig(){
    
    
  }

}
