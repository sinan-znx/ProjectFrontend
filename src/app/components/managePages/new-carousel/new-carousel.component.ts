import { Component, OnInit } from '@angular/core';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { FlashMessagesService } from '../../../services/flash-message.service';
@Component({
  selector: 'app-new-carousel',
  templateUrl: './new-carousel.component.html',
  styleUrls: ['./new-carousel.component.css'],
})
export class NewCarouselComponent implements OnInit {
  constructor(
    private adminApi: AdminApiService,
    private flashMsg: FlashMessagesService
  ) {}

  heading = '';
  offer = '';
  category = '';
  image = '';
  file: any;
  url: any;
  isUploading: boolean = false;
  isNew: boolean = false;
  ngOnInit(): void {}
  //FILE_TAKING_PROCESS
  onFileChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      console.log(this.file);
    }
  }
//ADDING_CAROUSEL
  addCarousel() {
    this.isUploading = true;
    //get secure url form our serve
    this.adminApi.getAwsUrl().subscribe(async (res) => {
      await res.url;
      this.url = res.url;
      console.log(this.url);
      this.adminApi.uploadImgAWS(this.url, this.file).subscribe((res) => {
        let carousel = {
          heading: this.heading,
          offer: this.offer,
          category: this.category,
          image: this.url.split('?')[0],
        };
console.log(carousel);

        this.adminApi.addCarousel(carousel).subscribe((res) => {
          if (res.success) {
            this.isNew = true;
            this.isUploading = false;
            this.flashMsg.show(res.msg, {
              cssClass: 'alert-success',
              timeout: 3000,
            });
          } else {
            this.isUploading = false;
            this.isUploading = false;
            this.flashMsg.show(res.msg, {
              cssClass: 'alert-danger',
              timeout: 3000,
            });
          }
        });
      });
    });
  }
//NEW
  newAddProduct($event: Event) {
    $event.preventDefault();
    this.isNew = false;
    this.heading = '';
    this.offer = '';
    this.category = '';
    this.image = '';
    this.url = '';
  }
}
