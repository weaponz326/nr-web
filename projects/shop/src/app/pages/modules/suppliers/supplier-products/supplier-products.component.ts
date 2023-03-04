import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalTwoComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-two/delete-modal-two.component'
// import { SelectProductComponent } from '../../../../components/select-windows/products-windows/select-product/select-product.component';

// import { SuppliersApiService } from 'projects/shop/src/app/services/modules-api/suppliers-api/suppliers-api.service';
// import { SupplierProduct } from 'projects/shop/src/app/models/modules/suppliers/suppliers.model';


@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss']
})
export class SupplierProductsComponent implements OnInit {

  constructor(
    private router: Router,
    // private suppliersApi: SuppliersApiService,
  ) { }

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalTwoComponentReference', { read: DeleteModalTwoComponent, static: false }) deleteModal!: DeleteModalTwoComponent;
  // @ViewChild('selectProductComponentReference', { read: SelectProductComponent, static: false }) selectProduct!: SelectProductComponent;

  productProductsGridData: any[] = [];

  deleteId = "";

  isFetchingGridData = false;
  isProductDeleting = false;

  ngOnInit(): void {
    this.getSupplierSupplierProduct();
  }

  getSupplierSupplierProduct(){
    this.isFetchingGridData = true;

    // this.suppliersApi.getSupplierSupplierProduct()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isFetchingGridData = false;
    //       this.productProductsGridData = res;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isFetchingGridData = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  postSupplierProduct(productData: any){
    // let data: SupplierProduct = {
    let data = {
      supplier: sessionStorage.getItem('shop_supplier_id') as string,
      product: productData.id,
    }

    // this.suppliersApi.postSupplierProduct(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       if(res.id){
    //         this.getSupplierSupplierProduct();
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  deleteSupplierProduct(){
    this.isProductDeleting = true;

    // this.suppliersApi.deleteSupplierProduct(this.deleteId)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.isProductDeleting = false;
    //       this.getSupplierSupplierProduct();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isProductDeleting = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  gotoProduct(id: any){
    sessionStorage.setItem('shop_product_id', id);
    this.router.navigateByUrl('/home/products/view-product');
  }

  confirmDelete(id: any){
    this.deleteId = id;
    this.deleteModal.openModal();
  }

}
