import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '../../../services/flash-message.service';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private adminApi: AdminApiService,
    private flashMsg: FlashMessagesService
  ) {
    this.allProducts();
  }
  productsData: any;

  ngOnInit(): void {}
  //To Get Products
  allProducts() {
    this.adminApi.getAllProducts().subscribe((res) => {
      this.productsData = res.data;
      console.log(this.productsData);
    });
  }

  //To Remove A Product
  removeProduct($event: Event, id: any) {
    $event.preventDefault();
    this.adminApi.removeOneProduct({ id: id }).subscribe((res) => {
      if (res.success) {
        this.allProducts();
        this.flashMsg.show('Product Removed', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
      } else {
        this.allProducts();
        this.flashMsg.show('Product failed to remove', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
      }
    });
  }
}
