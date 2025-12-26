import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { FlashMessagesService } from '../../../services/flash-message.service';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-edit-carousel',
  templateUrl: './edit-carousel.component.html',
  styleUrls: ['./edit-carousel.component.css'],
})
export class EditCarouselComponent implements OnInit {
  constructor(
    private userApi: UserApiService,
    private adminApi: AdminApiService,
    private flashMsg: FlashMessagesService
  ) {
    this.displayCarousel();
  }
  carouselData: any = [];
title='Edit Carousel'

  ngOnInit(): void {}
  //displayCarousel
  displayCarousel() {
    this.userApi.getCarousel().subscribe((res) => {
      this.carouselData = res.data;
      console.log(this.carouselData);
    });
  }
  //DeleteCarousel
  deleteCarousel($event: Event, id: any) {
    $event.preventDefault();
    let document = { _id: id };
    this.adminApi.removeCarousel(document).subscribe((res) => {
      if (res.success) {
        this.flashMsg.show('successfully removed', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.displayCarousel();
      }
    });
  }

}
