import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '../../services/flash-message.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private userApi: UserApiService,
    private flashMsg: FlashMessagesService
  ) {
    this.GetCartdata();
    this.totalAmount();
  }
  cartData: any;
  total: any = 0;
  ngOnInit(): void {}
  //CART_DATA
  GetCartdata() {
    let userId = { userId: localStorage.getItem('user_id') };
    this.userApi.getCart(userId).subscribe((res) => {
      this.cartData = res.data;
      console.log(this.cartData);
    });
  }
  //ON_CHANGE_QUANTITY
  quantityChange(incOrDec: any, productId: any) {
    let value = {
      user: localStorage.getItem('user_id'),
      product: productId,
      value: incOrDec,
    };
    this.userApi.incORdec(value).subscribe((res) => {
      this.GetCartdata();
      this.totalAmount();
    });
  }
  //TO_GET_TOTAL_AMOUNT
  totalAmount() {
    let userId = { userId: localStorage.getItem('user_id') };
    this.userApi.getTotal(userId).subscribe((res) => {
      this.total =
        res.total[0].totalAmount === undefined ? 0 : res.total[0].totalAmount;
    });
  }
  //REMOVE_PRODUCT_FROM_CART
  removeProduct($event: any, productId: string) {
    let details = {
      userId: localStorage.getItem('user_id'),
      productId: productId,
    };
    this.userApi.removeFromCart(details).subscribe((res) => {
      if (res.success) {
        this.GetCartdata();
        this.totalAmount();
        this.flashMsg.show('Product removed successfully', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
      } else {
        this.flashMsg.show('Fail to remove a product', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    });
  }
}
