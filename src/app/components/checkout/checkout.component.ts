import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from '../../services/flash-message.service';
import { UserApiService } from 'src/app/services/user-api.service';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  paymentMethod: any = 'online';
  deliveryDetails = {
    address: '',
    pincode: '',
    phone: '',
  };

  constructor(private userApi: UserApiService,private flashMsg:FlashMessagesService,private router:Router) {
    let userId = { userId: localStorage.getItem('user_id') };
    userApi.getTotal(userId).subscribe((res) => {
      this.total = res.total[0].totalAmount ?? 0;
    });
  }
  total: any;
  ngOnInit(): void {}

  //CHECKOUT
  checkout($event: Event) {
    $event.preventDefault();
    let details = {
      userId: localStorage.getItem('user_id'),
      totalAmount: this.total,
      address: this.deliveryDetails.address,
      pincode: this.deliveryDetails.pincode,
      phone: this.deliveryDetails.phone,
      paymentMethod: this.paymentMethod,
    };
    console.log(this.paymentMethod);

    this.userApi.checkoutOrder(details).subscribe((res) => {
      if (res.CODsuccess) {
        console.log('codsuccess');
      } else {
        console.log(res.order);

        var ref = this;
        var options = {
          key: 'rzp_test_L0BoevbClOoS6I', // Enter the Key ID generated from the Dashboard
          amount: res.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: 'INR',
          name: 'CLICK',
          description: 'Test Transaction',
          order_id: res.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
          handler: function (response: any) {
            ref.razorpay_response_handler(response, res.order);
          },

          prefill: {
            name: 'Gaurav Kumar',
            email: 'gaurav.kumar@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };
        let rzp1 = new Razorpay(options);
        rzp1.open();
      }
    });
  }
  //RADIO_BUTTON
  radioButton($event: Event) {
    this.paymentMethod = ($event.target as HTMLInputElement).value;
  }
  //VERIFY_PAYMENT
  razorpay_response_handler(response: any, order: any): any {
    let data = {
      ...response,
      ...order,
      userId: localStorage.getItem('user_id'),
    };

    this.userApi.verifyPayment(data).subscribe((res) => {
      if (res.success) {
this.flashMsg.show('Successfull Payment',{cssClass:'alert-success',timeout:3000})
this.router.navigate(['/successfullPay'])
} else {
        this.flashMsg.show('Unsuccessfull Payment',{cssClass:'alert-danger',timeout:3000})
        this.router.navigate(['/failedPay'])

      }
    });
  }
}
