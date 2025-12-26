import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from '../../../services/flash-message.service';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  constructor(
    private adminApi: AdminApiService,
    private flashMsg: FlashMessagesService,
    private router: Router
  ) {}
  url: any = '';
  thumbnail: any;
  product = {
    name: '',
    category: '',
    actualPrice: 0,
    offerPrice: 0,
    description: '',
    thumbnail: '',
  };
  ngOnInit(): void {}
  //File_accepting
  onFileChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.thumbnail = target.files[0];
      console.log(this.thumbnail);
    }
  }
  addProduct() {
    this.adminApi.getAwsUrl().subscribe((res) => {
      this.url = res.url;
      this.adminApi.uploadImgAWS(this.url, this.thumbnail).subscribe((res) => {
        this.product.thumbnail = this.url.split('?')[0];
        console.log(this.product);

        this.adminApi.addProduct(this.product).subscribe((res) => {
          if (res.success) {
            this.router.navigate(['/manage/editProduct']);
            this.flashMsg.show(res.msg, {
              cssClass: 'alert-success',
              timeout: 3000,
            });
          } else {
            this.flashMsg.show(res.msg, {
              cssClass: 'alert-danger',
              timeout: 3000,
            });
          }
        });
      });
    });
  }
}
