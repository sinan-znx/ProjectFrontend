import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from '../../services/flash-message.service';
import { Router } from '@angular/router';
import { Match } from 'src/app/validators/match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private flashMsg: FlashMessagesService,
    private router: Router
  ) {}
  isSubmited: any = false;
  ngOnInit(): void {}
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', Validators.required);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  phone = new FormControl('', [Validators.required]);
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    phone: this.phone,
    password: this.password,
    confirmPassword: this.confirmPassword,
  },[Match.match]);

  //SignUp click
  signUpClicked() {
    this.isSubmited = true;
    let user = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      password: this.password.value,
    };

    this.auth.register(user).subscribe((res) => {
      if (res.success) {
        this.router.navigate(['/login']);
        this.flashMsg.show(res.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
      } else {
        this.isSubmited = false;
        this.flashMsg.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    });
  }
}
